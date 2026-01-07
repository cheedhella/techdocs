#!/bin/bash

set -e

# Configuration
TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}
TOMCAT_SERVICE="tomcat"

# Get Host IP
if [[ "$OSTYPE" == "darwin"* ]]; then
    HOST_IP=$(ipconfig getifaddr en0 || ipconfig getifaddr en1 || echo "localhost")
else
    HOST_IP=$(hostname -I | awk '{print $1}')
    HOST_IP=${HOST_IP:-localhost}
fi

# Detect Homebrew Tomcat on macOS (prefer Tomcat 9 for javax.servlet compatibility)
if [[ "$OSTYPE" == "darwin"* ]] && [ -d "/opt/homebrew/opt/tomcat@9" ]; then
    TOMCAT_HOME="/opt/homebrew/opt/tomcat@9/libexec"
    TOMCAT_SERVICE="tomcat@9"
    echo "Detected Homebrew Tomcat 9 at $TOMCAT_HOME"
elif [[ "$OSTYPE" == "darwin"* ]] && [ -d "/usr/local/opt/tomcat@9" ]; then
    TOMCAT_HOME="/usr/local/opt/tomcat@9/libexec"
    TOMCAT_SERVICE="tomcat@9"
    echo "Detected Homebrew Tomcat 9 at $TOMCAT_HOME"
elif [[ "$OSTYPE" == "darwin"* ]] && [ -d "/opt/homebrew/opt/tomcat" ]; then
    TOMCAT_HOME="/opt/homebrew/opt/tomcat/libexec"
    TOMCAT_SERVICE="tomcat"
    echo "⚠️  WARNING: Detected Tomcat 10+. This app requires Tomcat 9 for javax.servlet compatibility."
    echo "   Install Tomcat 9: brew uninstall tomcat && brew install tomcat@9"
    echo "Detected Homebrew Tomcat at $TOMCAT_HOME"
elif [[ "$OSTYPE" == "darwin"* ]] && [ -d "/usr/local/opt/tomcat" ]; then
    TOMCAT_HOME="/usr/local/opt/tomcat/libexec"
    TOMCAT_SERVICE="tomcat"
    echo "⚠️  WARNING: Detected Tomcat 10+. This app requires Tomcat 9 for javax.servlet compatibility."
    echo "   Install Tomcat 9: brew uninstall tomcat && brew install tomcat@9"
    echo "Detected Homebrew Tomcat at $TOMCAT_HOME"
fi

PROJECT_DIR=$(pwd)

echo "========================================="
echo "Spec Kafka - Native Tomcat Deployment"
echo "========================================="

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v java &> /dev/null; then
    echo "ERROR: Java not found. Please install Java 11+"
    exit 1
fi

if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven not found. Please install Maven"
    exit 1
fi

if [ ! -d "$TOMCAT_HOME" ]; then
    echo "ERROR: Tomcat not found at $TOMCAT_HOME"
    echo "Please set TOMCAT_HOME environment variable"
    exit 1
fi

echo "✓ Java: $(java -version 2>&1 | head -n 1)"
echo "✓ Maven: $(mvn -version | head -n 1)"
echo "✓ Tomcat: $TOMCAT_HOME"

# Check if Kafka is reachable
echo ""
echo "Checking Kafka cluster..."
KAFKA_SERVERS=("10.253.228.200")
KAFKA_REACHABLE=false

for server in "${KAFKA_SERVERS[@]}"; do
    if nc -z "$server" 9092 2>/dev/null; then
        echo "✓ Kafka broker reachable: $server:9092"
        KAFKA_REACHABLE=true
        break
    fi
done

if [ "$KAFKA_REACHABLE" = false ]; then
    echo "WARNING: Cannot reach Kafka cluster"
    echo "  Server: 10.253.228.200:9092"
    echo "  Please check network connectivity"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build project
echo ""
echo "Building project..."
mvn clean install -DskipTests
echo "✓ Build complete"

# Stop Tomcat
echo ""
echo "Stopping Tomcat..."
if [[ "$OSTYPE" == "darwin"* ]] && command -v brew &> /dev/null; then
    if brew services list | grep -q "${TOMCAT_SERVICE}.*started"; then
        brew services stop $TOMCAT_SERVICE
        sleep 5
        echo "✓ Tomcat stopped (Homebrew)"
    else
        echo "✓ Tomcat not running"
    fi
else
    $TOMCAT_HOME/bin/shutdown.sh 2>/dev/null || true
    sleep 5
    echo "✓ Tomcat stopped"
fi

# Clean old deployments
echo ""
echo "Cleaning old deployments..."
rm -rf $TOMCAT_HOME/webapps/spec-producer*
rm -rf $TOMCAT_HOME/webapps/spec-consumer*
echo "✓ Old deployments removed"

# Deploy new WARs
echo ""
echo "Deploying new WARs..."
cp spec-producer-webapp/target/spec-producer.war $TOMCAT_HOME/webapps/
cp spec-consumer-webapp/target/spec-consumer.war $TOMCAT_HOME/webapps/
echo "✓ WARs deployed"

# Start Tomcat
echo ""
echo "Starting Tomcat..."
if [[ "$OSTYPE" == "darwin"* ]] && command -v brew &> /dev/null; then
    brew services start $TOMCAT_SERVICE
    echo "✓ Tomcat started (Homebrew)"
else
    $TOMCAT_HOME/bin/startup.sh
    echo "✓ Tomcat started"
fi

# Wait for deployment
echo ""
echo "Waiting for applications to deploy (20 seconds)..."
sleep 20

# Test endpoints
echo ""
echo "Testing endpoints..."

if curl -s http://localhost:8080/spec-producer/status > /dev/null; then
    echo "✓ Producer is accessible: http://$HOST_IP:8080/spec-producer"
else
    echo "✗ Producer is not accessible yet: http://$HOST_IP:8080/spec-producer"
fi

if curl -s http://localhost:8080/spec-consumer/status > /dev/null; then
    echo "✓ Consumer is accessible: http://$HOST_IP:8080/spec-consumer"
else
    echo "✗ Consumer is not accessible yet: http://$HOST_IP:8080/spec-consumer"
fi

echo ""
echo "========================================="
echo "Deployment Complete!"
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

