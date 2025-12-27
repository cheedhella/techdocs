#!/bin/bash

################################################################################
# Rocky Linux Deployment Script
# Uses systemctl for Tomcat management
################################################################################

set -e

TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}
WEBAPPS_DIR="$TOMCAT_HOME/webapps"
LOGS_DIR="$TOMCAT_HOME/logs"

echo "========================================="
echo "Spec Kafka - Rocky Linux Deployment"
echo "========================================="
echo "Tomcat Home: $TOMCAT_HOME"
echo ""

# Verify Tomcat structure
if [ ! -d "$WEBAPPS_DIR" ]; then
    echo "ERROR: Tomcat webapps directory not found at $WEBAPPS_DIR"
    echo ""
    echo "Please run the fix script first:"
    echo "  sudo ./fix-tomcat-structure.sh"
    echo ""
    exit 1
fi

# Check Kafka connectivity
echo "Checking Kafka cluster..."
KAFKA_SERVERS=("10.253.229.13" "10.253.228.68" "10.253.228.200")
KAFKA_REACHABLE=false

for server in "${KAFKA_SERVERS[@]}"; do
    if nc -z "$server" 9092 2>/dev/null; then
        echo "✓ Kafka broker reachable: $server:9092"
        KAFKA_REACHABLE=true
        break
    fi
done

if [ "$KAFKA_REACHABLE" = false ]; then
    echo "⚠️  WARNING: Cannot reach Kafka cluster"
fi

# Build
echo ""
echo "Building project..."
mvn clean install -DskipTests
echo "✓ Build complete"

# Stop Tomcat
echo ""
echo "Stopping Tomcat..."
systemctl stop tomcat 2>/dev/null || true
sleep 5
pkill -9 -f tomcat 2>/dev/null || true
echo "✓ Tomcat stopped"

# Clean old deployments
echo ""
echo "Cleaning old deployments..."
rm -rf $WEBAPPS_DIR/spec-producer*
rm -rf $WEBAPPS_DIR/spec-consumer*
echo "✓ Old deployments removed"

# Deploy new WARs
echo ""
echo "Deploying new WARs..."
cp spec-producer-webapp/target/spec-producer.war $WEBAPPS_DIR/
cp spec-consumer-webapp/target/spec-consumer.war $WEBAPPS_DIR/
echo "✓ WARs deployed to $WEBAPPS_DIR"

# Set ownership
if id tomcat &>/dev/null; then
    chown tomcat:tomcat $WEBAPPS_DIR/*.war
    echo "✓ Ownership set to tomcat user"
fi

# Start Tomcat
echo ""
echo "Starting Tomcat..."
systemctl start tomcat
echo "✓ Tomcat started"

# Wait for deployment
echo ""
echo "Waiting for applications to deploy (30 seconds)..."
sleep 30

# Test endpoints
echo ""
echo "Testing endpoints..."
if curl -s http://localhost:8080/spec-producer/status > /dev/null 2>&1; then
    echo "✓ Producer is accessible"
else
    echo "⚠️  Producer is not accessible yet (may need more time)"
fi

if curl -s http://localhost:8080/spec-consumer/status > /dev/null 2>&1; then
    echo "✓ Consumer is accessible"
else
    echo "⚠️  Consumer is not accessible yet (may need more time)"
fi

echo ""
echo "========================================="
echo "Deployment Complete!"
echo "========================================="
echo ""
echo "Access the applications:"
echo "  Producer: http://localhost:8080/spec-producer"
echo "  Consumer: http://localhost:8080/spec-consumer"
echo ""
echo "Quick test commands:"
echo "  curl http://localhost:8080/spec-consumer/start"
echo "  curl http://localhost:8080/spec-producer/produce"
echo ""
echo "View logs:"
echo "  tail -f $LOGS_DIR/catalina.out"
echo "  journalctl -u tomcat -f"
echo ""
echo "Manage Tomcat:"
echo "  systemctl status tomcat"
echo "  systemctl stop tomcat"
echo "  systemctl restart tomcat"
echo ""

