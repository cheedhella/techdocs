#!/bin/bash

TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}

# Detect Homebrew Tomcat on macOS
if [[ "$OSTYPE" == "darwin"* ]] && [ -d "/opt/homebrew/opt/tomcat" ]; then
    TOMCAT_HOME="/opt/homebrew/opt/tomcat/libexec"
elif [[ "$OSTYPE" == "darwin"* ]] && [ -d "/usr/local/opt/tomcat" ]; then
    TOMCAT_HOME="/usr/local/opt/tomcat/libexec"
fi

echo "========================================="
echo "Stopping Spec Kafka Services"
echo "========================================="

# Stop applications gracefully
echo ""
echo "Stopping applications..."
curl -s http://localhost:8080/spec-producer/stop > /dev/null 2>&1 || true
curl -s http://localhost:8080/spec-consumer/stop > /dev/null 2>&1 || true
sleep 2
echo "✓ Applications stopped"

# Stop Tomcat
echo ""
echo "Stopping Tomcat..."
if [[ "$OSTYPE" == "darwin"* ]] && command -v brew &> /dev/null; then
    if brew list tomcat &> /dev/null; then
        brew services stop tomcat
        sleep 5
        echo "✓ Tomcat stopped (Homebrew)"
    else
        echo "✗ Tomcat not installed via Homebrew"
    fi
elif [ -f "$TOMCAT_HOME/bin/shutdown.sh" ]; then
    $TOMCAT_HOME/bin/shutdown.sh
    sleep 5
    echo "✓ Tomcat stopped"
else
    echo "✗ Tomcat not found at $TOMCAT_HOME"
fi

echo ""
echo "========================================="
echo "Services Stopped!"
echo "========================================="
echo ""
echo "Note: Kafka cluster (production) is still running:"
echo "  - 10.253.229.13:9092"
echo "  - 10.253.228.68:9092"
echo "  - 10.253.228.200:9092"
echo ""
echo "If you're using local Kafka for testing:"
echo "  cd kafka-setup && ./stop-kafka-native.sh"
echo "  OR"
echo "  cd kafka-setup && docker-compose down"
echo ""

