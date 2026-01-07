#!/bin/bash

echo "========================================="
echo "Starting Local Kafka"
echo "========================================="
echo ""
echo "⚠️  NOTE: The application is configured to use production Kafka:"
echo "  - 10.253.228.200:9092"
echo ""
echo "Only start local Kafka if you want to test locally."
echo ""
read -p "Start LOCAL Kafka? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled. Using production Kafka cluster."
    exit 0
fi

KAFKA_HOME=${KAFKA_HOME:-/opt/kafka}

# Check if using Homebrew Kafka on macOS
if [[ "$OSTYPE" == "darwin"* ]] && command -v brew &> /dev/null; then
    if brew list kafka &> /dev/null; then
        echo "Starting Kafka via Homebrew..."
        brew services start zookeeper
        sleep 3
        brew services start kafka
        echo "✓ Kafka started via Homebrew"
        echo ""
        echo "Kafka is running on localhost:9092"
        echo ""
        echo "⚠️  Remember to update kafka.properties:"
        echo "  kafka.bootstrap.servers=localhost:9092"
        exit 0
    fi
fi

# Manual start
if [ ! -d "$KAFKA_HOME" ]; then
    echo "ERROR: Kafka not found at $KAFKA_HOME"
    echo "Please install Kafka first: ./install-kafka-native.sh"
    exit 1
fi

echo "Starting Zookeeper..."
$KAFKA_HOME/bin/zookeeper-server-start.sh $KAFKA_HOME/config/zookeeper.properties > /tmp/zookeeper.log 2>&1 &
sleep 5

echo "Starting Kafka..."
$KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties > /tmp/kafka.log 2>&1 &
sleep 10

echo "✓ Kafka started"
echo ""
echo "Kafka is running on localhost:9092"
echo "Logs:"
echo "  Zookeeper: /tmp/zookeeper.log"
echo "  Kafka: /tmp/kafka.log"
echo ""
echo "⚠️  Remember to update kafka.properties:"
echo "  kafka.bootstrap.servers=localhost:9092"
echo ""

