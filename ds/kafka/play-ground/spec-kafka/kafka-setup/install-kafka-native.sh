#!/bin/bash

set -e

echo "========================================="
echo "Kafka Native Installation Script"
echo "========================================="
echo ""
echo "⚠️  NOTE: This is OPTIONAL!"
echo "The application is already configured to use:"
echo "  - 10.253.229.13:9092"
echo "  - 10.253.228.68:9092"
echo "  - 10.253.228.200:9092"
echo ""
read -p "Do you want to install a LOCAL Kafka instance? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Installation cancelled. Using production Kafka cluster."
    exit 0
fi

INSTALL_DIR=${KAFKA_INSTALL_DIR:-/opt}
KAFKA_VERSION="3.6.1"
SCALA_VERSION="2.13"

echo ""
echo "Installing Kafka $KAFKA_VERSION to $INSTALL_DIR"
echo ""

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "Detected macOS"
    
    if command -v brew &> /dev/null; then
        echo "Installing Kafka via Homebrew..."
        brew install kafka
        echo "✓ Kafka installed via Homebrew"
        echo ""
        echo "Kafka location: /usr/local/opt/kafka"
        echo "To start: brew services start zookeeper && brew services start kafka"
    else
        echo "Homebrew not found. Installing manually..."
        cd /tmp
        wget https://downloads.apache.org/kafka/${KAFKA_VERSION}/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz
        sudo tar -xzf kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz -C $INSTALL_DIR
        sudo ln -sf $INSTALL_DIR/kafka_${SCALA_VERSION}-${KAFKA_VERSION} $INSTALL_DIR/kafka
        echo "✓ Kafka installed to $INSTALL_DIR/kafka"
    fi
    
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "Detected Linux"
    
    cd /tmp
    wget https://downloads.apache.org/kafka/${KAFKA_VERSION}/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz
    sudo tar -xzf kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz -C $INSTALL_DIR
    sudo ln -sf $INSTALL_DIR/kafka_${SCALA_VERSION}-${KAFKA_VERSION} $INSTALL_DIR/kafka
    echo "✓ Kafka installed to $INSTALL_DIR/kafka"
    
else
    echo "Unsupported OS: $OSTYPE"
    echo "Please install Kafka manually from: https://kafka.apache.org/downloads"
    exit 1
fi

echo ""
echo "========================================="
echo "Installation Complete!"
echo "========================================="
echo ""
echo "To use local Kafka:"
echo "1. Start Kafka: ./start-kafka-native.sh"
echo "2. Update kafka.properties to use localhost:9092"
echo "3. Rebuild and redeploy the application"
echo ""
echo "To use production Kafka (default):"
echo "  No changes needed - already configured!"
echo ""

