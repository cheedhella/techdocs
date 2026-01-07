#!/bin/bash

################################################################################
# Quick Redeploy Script
# Rebuilds and redeploys without full checks
################################################################################

set -e

TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}
WEBAPPS_DIR="$TOMCAT_HOME/webapps"
HOST_IP=$(hostname -I | awk '{print $1}')
HOST_IP=${HOST_IP:-localhost}

echo "========================================="
echo "Quick Redeploy"
echo "========================================="
echo ""

# Build
echo "Building project..."
mvn clean install -DskipTests
echo "✓ Build complete"
echo ""

# Stop Tomcat
echo "Stopping Tomcat..."
systemctl stop tomcat 2>/dev/null || true
sleep 3
pkill -9 -f tomcat 2>/dev/null || true
echo "✓ Tomcat stopped"
echo ""

# Clean old deployments
echo "Cleaning old deployments..."
rm -rf $WEBAPPS_DIR/spec-producer*
rm -rf $WEBAPPS_DIR/spec-consumer*
echo "✓ Old deployments removed"
echo ""

# Deploy new WARs
echo "Deploying new WARs..."
cp spec-producer-webapp/target/spec-producer.war $WEBAPPS_DIR/
cp spec-consumer-webapp/target/spec-consumer.war $WEBAPPS_DIR/

# Set ownership
if id tomcat &>/dev/null; then
    chown tomcat:tomcat $WEBAPPS_DIR/spec-*.war
fi

echo "✓ WARs deployed"
echo ""

# Start Tomcat
echo "Starting Tomcat..."
systemctl start tomcat
echo "✓ Tomcat started"
echo ""

# Wait for deployment
echo "Waiting for deployment (40 seconds)..."
for i in {1..40}; do
    sleep 1
    if [ -d "$WEBAPPS_DIR/spec-consumer" ] && [ -d "$WEBAPPS_DIR/spec-producer" ]; then
        echo "✓ Applications deployed after $i seconds"
        break
    fi
    if [ $((i % 10)) -eq 0 ]; then
        echo "  ... still waiting ($i seconds)"
    fi
done

echo ""

# Test endpoints
echo "Testing endpoints..."
sleep 5

if curl -s http://localhost:8080/spec-producer/status > /dev/null 2>&1; then
    echo "✓ Producer is accessible: http://$HOST_IP:8080/spec-producer"
else
    echo "⚠️  Producer not accessible yet: http://$HOST_IP:8080/spec-producer"
fi

if curl -s http://localhost:8080/spec-consumer/status > /dev/null 2>&1; then
    echo "✓ Consumer is accessible: http://$HOST_IP:8080/spec-consumer"
else
    echo "⚠️  Consumer not accessible yet: http://$HOST_IP:8080/spec-consumer"
fi

echo ""
echo "========================================="
echo "Redeploy Complete!"
echo "========================================="
echo ""
echo "Access the applications:"
echo "  Producer: http://$HOST_IP:8080/spec-producer"
echo "  Consumer: http://$HOST_IP:8080/spec-consumer"
echo ""
echo "API Endpoints:"
echo "  Producer:"
echo "    - Start: curl -X POST http://$HOST_IP:8080/spec-producer/produce"
echo "    - Stop:  curl -X POST http://$HOST_IP:8080/spec-producer/stop"
echo "    - Status: curl http://$HOST_IP:8080/spec-producer/status"
echo ""
echo "  Consumer:"
echo "    - Start: curl -X POST http://$HOST_IP:8080/spec-consumer/start"
echo "    - Stop:  curl -X POST http://$HOST_IP:8080/spec-consumer/stop"
echo "    - Status: curl http://$HOST_IP:8080/spec-consumer/status"
echo ""
echo "View logs:"
echo "  Producer: tail -f $TOMCAT_HOME/logs/spec-producer.log"
echo "  Consumer: tail -f $TOMCAT_HOME/logs/spec-consumer.log"
echo "  Tomcat:   tail -f $TOMCAT_HOME/logs/catalina.out"
echo ""

