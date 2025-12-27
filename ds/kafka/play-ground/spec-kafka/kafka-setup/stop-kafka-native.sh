#!/bin/bash

echo "========================================="
echo "Stopping Local Kafka"
echo "========================================="

KAFKA_HOME=${KAFKA_HOME:-/opt/kafka}

# Check if using Homebrew Kafka on macOS
if [[ "$OSTYPE" == "darwin"* ]] && command -v brew &> /dev/null; then
    if brew list kafka &> /dev/null; then
        echo "Stopping Kafka via Homebrew..."
        brew services stop kafka
        brew services stop zookeeper
        echo "✓ Kafka stopped"
        exit 0
    fi
fi

# Manual stop
if [ -f "$KAFKA_HOME/bin/kafka-server-stop.sh" ]; then
    echo "Stopping Kafka..."
    $KAFKA_HOME/bin/kafka-server-stop.sh
    sleep 3
    
    echo "Stopping Zookeeper..."
    $KAFKA_HOME/bin/zookeeper-server-stop.sh
    sleep 2
    
    echo "✓ Kafka stopped"
else
    echo "Kafka not found at $KAFKA_HOME"
    echo "Attempting to kill processes..."
    pkill -f kafka
    pkill -f zookeeper
    echo "✓ Processes killed"
fi

echo ""
echo "Local Kafka stopped."
echo "Application will use production Kafka cluster."
echo ""

