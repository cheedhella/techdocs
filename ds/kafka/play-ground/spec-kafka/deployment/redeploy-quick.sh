#!/bin/bash

################################################################################
# Quick Redeploy Script
# Rebuilds and redeploys without full checks
################################################################################

set -e

TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}
WEBAPPS_DIR="$TOMCAT_HOME/webapps"

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
    echo "✓ Producer is accessible: http://localhost:8080/spec-producer"
else
    echo "⚠️  Producer not accessible yet"
fi

if curl -s http://localhost:8080/spec-consumer/status > /dev/null 2>&1; then
    echo "✓ Consumer is accessible: http://localhost:8080/spec-consumer"
else
    echo "⚠️  Consumer not accessible yet"
fi

echo ""
echo "========================================="
echo "Redeploy Complete!"
echo "========================================="
echo ""
echo "Check logs if needed:"
echo "  tail -f $TOMCAT_HOME/logs/catalina.out"
echo ""

