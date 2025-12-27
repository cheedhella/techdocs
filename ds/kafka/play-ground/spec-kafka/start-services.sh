#!/bin/bash

TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}

# Detect Homebrew Tomcat on macOS
if [[ "$OSTYPE" == "darwin"* ]] && [ -d "/opt/homebrew/opt/tomcat" ]; then
    TOMCAT_HOME="/opt/homebrew/opt/tomcat/libexec"
elif [[ "$OSTYPE" == "darwin"* ]] && [ -d "/usr/local/opt/tomcat" ]; then
    TOMCAT_HOME="/usr/local/opt/tomcat/libexec"
fi

echo "========================================="
echo "Starting Spec Kafka Services"
echo "========================================="

# Check Kafka cluster connectivity
echo ""
echo "Checking Kafka cluster connectivity..."
KAFKA_SERVERS=("10.253.229.13" "10.253.228.68" "10.253.228.200")
KAFKA_REACHABLE=false

for server in "${KAFKA_SERVERS[@]}"; do
    if nc -z "$server" 9092 2>/dev/null; then
        echo "✓ Kafka broker reachable: $server:9092"
        KAFKA_REACHABLE=true
    else
        echo "✗ Cannot reach: $server:9092"
    fi
done

if [ "$KAFKA_REACHABLE" = false ]; then
    echo ""
    echo "⚠️  WARNING: Cannot reach any Kafka brokers"
    echo "   Please check network connectivity"
    echo ""
    echo "   If you need a local Kafka for testing:"
    echo "   cd kafka-setup && docker-compose up -d"
    echo ""
else
    echo "✓ Kafka cluster is reachable"
fi

# Start Tomcat
echo ""
echo "Starting Tomcat..."
if [[ "$OSTYPE" == "darwin"* ]] && command -v brew &> /dev/null; then
    if brew list tomcat &> /dev/null; then
        brew services start tomcat
        echo "✓ Tomcat started (Homebrew)"
    else
        echo "✗ Tomcat not installed via Homebrew"
        echo "  Install: brew install tomcat"
    fi
elif [ -f "$TOMCAT_HOME/bin/startup.sh" ]; then
    $TOMCAT_HOME/bin/startup.sh
    echo "✓ Tomcat started"
else
    echo "✗ Tomcat not found at $TOMCAT_HOME"
    echo "  Please set TOMCAT_HOME environment variable"
fi

echo ""
echo "========================================="
echo "Services Started!"
echo "========================================="
echo ""
echo "Service Status:"
echo "  Kafka Cluster:"
echo "    - 10.253.229.13:9092"
echo "    - 10.253.228.68:9092"
echo "    - 10.253.228.200:9092"
echo "  Tomcat: localhost:8080"
echo ""
echo "Application URLs:"
echo "  Producer: http://localhost:8080/spec-producer"
echo "  Consumer: http://localhost:8080/spec-consumer"
echo ""
echo "View logs:"
echo "  tail -f $TOMCAT_HOME/logs/catalina.out"
echo ""

