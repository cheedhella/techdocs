#!/bin/bash

set -e

# Detect Tomcat location
if [ -f "/opt/homebrew/opt/tomcat@9/bin/catalina" ]; then
    TOMCAT_HOME="/opt/homebrew/opt/tomcat@9"
    WEBAPPS_DIR="/opt/homebrew/opt/tomcat@9/libexec/webapps"
    LOGS_DIR="/opt/homebrew/opt/tomcat@9/libexec/logs"
elif [ -f "/usr/local/opt/tomcat@9/bin/catalina" ]; then
    TOMCAT_HOME="/usr/local/opt/tomcat@9"
    WEBAPPS_DIR="/usr/local/opt/tomcat@9/libexec/webapps"
    LOGS_DIR="/usr/local/opt/tomcat@9/libexec/logs"
elif [ -f "/opt/homebrew/opt/tomcat/bin/catalina" ]; then
    TOMCAT_HOME="/opt/homebrew/opt/tomcat"
    WEBAPPS_DIR="/opt/homebrew/opt/tomcat/libexec/webapps"
    LOGS_DIR="/opt/homebrew/opt/tomcat/libexec/logs"
elif [ -f "/usr/local/opt/tomcat/bin/catalina" ]; then
    TOMCAT_HOME="/usr/local/opt/tomcat"
    WEBAPPS_DIR="/usr/local/opt/tomcat/libexec/webapps"
    LOGS_DIR="/usr/local/opt/tomcat/libexec/logs"
else
    TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}
    WEBAPPS_DIR="$TOMCAT_HOME/webapps"
    LOGS_DIR="$TOMCAT_HOME/logs"
fi

echo "========================================="
echo "Spec Kafka - Manual Tomcat Deployment"
echo "========================================="
echo "Tomcat Home: $TOMCAT_HOME"

# Verify Tomcat structure
if [ ! -d "$WEBAPPS_DIR" ]; then
    echo ""
    echo "ERROR: Tomcat webapps directory not found at $WEBAPPS_DIR"
    echo ""
    echo "Current structure:"
    ls -la $TOMCAT_HOME/ 2>/dev/null || ls -la /opt/ | grep tomcat
    echo ""
    echo "It looks like your Tomcat installation has an incorrect directory structure."
    echo "Please run the fix script first:"
    echo "  sudo ./fix-tomcat-structure.sh"
    echo ""
    exit 1
fi

if [ ! -f "$TOMCAT_HOME/bin/catalina" ] && [ ! -f "$TOMCAT_HOME/bin/catalina.sh" ]; then
    echo ""
    echo "ERROR: Tomcat catalina script not found at $TOMCAT_HOME/bin/"
    echo ""
    echo "Please run the fix script first:"
    echo "  sudo ./fix-tomcat-structure.sh"
    echo ""
    exit 1
fi

echo ""

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
$TOMCAT_HOME/bin/catalina stop 2>/dev/null || true
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

# Start Tomcat
echo ""
echo "Starting Tomcat..."
$TOMCAT_HOME/bin/catalina start
echo "✓ Tomcat started"

# Wait for deployment
echo ""
echo "Waiting for applications to deploy (25 seconds)..."
sleep 25

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
echo "View logs:"
echo "  tail -f $LOGS_DIR/catalina.out"
echo ""
echo "Stop Tomcat:"
echo "  $TOMCAT_HOME/bin/catalina stop"
echo ""

