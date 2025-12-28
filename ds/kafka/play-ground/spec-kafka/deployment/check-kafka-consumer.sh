#!/bin/bash

################################################################################
# Check Kafka Consumer Status
# Verifies consumer group registration and connectivity
################################################################################

# Configuration
KAFKA_SERVERS="10.253.229.13:9092,10.253.228.68:9092,10.253.228.200:9092"
CONSUMER_GROUP="order-consumer-group"
TOPIC="orders"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

echo "========================================="
echo "Kafka Consumer Diagnostics"
echo "========================================="
echo ""

# Check if kafka-consumer-groups.sh is available
if ! command -v kafka-consumer-groups.sh &> /dev/null; then
    print_warning "kafka-consumer-groups.sh not found in PATH"
    print_info "Trying common Kafka locations..."
    
    KAFKA_PATHS=(
        "/opt/kafka/bin/kafka-consumer-groups.sh"
        "/usr/local/kafka/bin/kafka-consumer-groups.sh"
        "$HOME/kafka/bin/kafka-consumer-groups.sh"
    )
    
    KAFKA_CMD=""
    for path in "${KAFKA_PATHS[@]}"; do
        if [ -f "$path" ]; then
            KAFKA_CMD="$path"
            print_success "Found: $KAFKA_CMD"
            break
        fi
    done
    
    if [ -z "$KAFKA_CMD" ]; then
        print_error "Kafka tools not found"
        echo ""
        echo "Please install Kafka tools or specify the path:"
        echo "  export PATH=\$PATH:/path/to/kafka/bin"
        echo ""
        echo "Or use this command directly:"
        echo "  /path/to/kafka/bin/kafka-consumer-groups.sh --bootstrap-server $KAFKA_SERVERS --list"
        exit 1
    fi
else
    KAFKA_CMD="kafka-consumer-groups.sh"
fi

# 1. List all consumer groups
echo "1. Listing all consumer groups..."
echo "-----------------------------------"
GROUPS=$($KAFKA_CMD --bootstrap-server $KAFKA_SERVERS --list 2>&1)

if echo "$GROUPS" | grep -q "$CONSUMER_GROUP"; then
    print_success "Consumer group '$CONSUMER_GROUP' found!"
else
    print_warning "Consumer group '$CONSUMER_GROUP' not found in list"
    echo ""
    echo "Available groups:"
    echo "$GROUPS"
fi

echo ""

# 2. Describe the consumer group
echo "2. Describing consumer group: $CONSUMER_GROUP"
echo "-----------------------------------"
GROUP_DESC=$($KAFKA_CMD --bootstrap-server $KAFKA_SERVERS --describe --group $CONSUMER_GROUP 2>&1)

if echo "$GROUP_DESC" | grep -q "Consumer group '$CONSUMER_GROUP' does not exist"; then
    print_error "Consumer group does not exist yet"
    echo ""
    print_info "This is normal if:"
    echo "  - Consumer just started"
    echo "  - No messages have been consumed yet"
    echo "  - Consumer hasn't committed offsets"
    echo ""
    print_info "Try:"
    echo "  1. Produce some messages"
    echo "  2. Wait a few seconds"
    echo "  3. Run this script again"
else
    echo "$GROUP_DESC"
    echo ""
    
    if echo "$GROUP_DESC" | grep -q "STABLE"; then
        print_success "Consumer group is STABLE"
    elif echo "$GROUP_DESC" | grep -q "EMPTY"; then
        print_warning "Consumer group is EMPTY (no active members)"
    fi
fi

echo ""

# 3. Check consumer group state
echo "3. Checking consumer group state..."
echo "-----------------------------------"
STATE=$($KAFKA_CMD --bootstrap-server $KAFKA_SERVERS --describe --group $CONSUMER_GROUP --state 2>&1)
echo "$STATE"
echo ""

# 4. Check consumer group members
echo "4. Checking consumer group members..."
echo "-----------------------------------"
MEMBERS=$($KAFKA_CMD --bootstrap-server $KAFKA_SERVERS --describe --group $CONSUMER_GROUP --members 2>&1)
echo "$MEMBERS"
echo ""

# 5. Check topic details
echo "5. Checking topic: $TOPIC"
echo "-----------------------------------"
if command -v kafka-topics.sh &> /dev/null; then
    TOPIC_INFO=$(kafka-topics.sh --bootstrap-server $KAFKA_SERVERS --describe --topic $TOPIC 2>&1)
    echo "$TOPIC_INFO"
else
    print_warning "kafka-topics.sh not found, skipping topic check"
fi

echo ""

# 6. Check application logs
echo "6. Checking application logs..."
echo "-----------------------------------"
if [ -f "/opt/tomcat/logs/spec-consumer.log" ]; then
    print_info "Recent consumer logs:"
    tail -20 /opt/tomcat/logs/spec-consumer.log | grep -i "consumer\|kafka\|order"
else
    print_warning "Consumer log not found at /opt/tomcat/logs/spec-consumer.log"
fi

echo ""

# 7. Test consumer endpoint
echo "7. Testing consumer endpoint..."
echo "-----------------------------------"
if curl -s http://localhost:8080/spec-consumer/status > /dev/null 2>&1; then
    STATUS=$(curl -s http://localhost:8080/spec-consumer/status)
    print_success "Consumer endpoint is accessible"
    echo "Response: $STATUS"
else
    print_error "Consumer endpoint not accessible"
fi

echo ""
echo "========================================="
echo "Summary"
echo "========================================="
echo ""

print_info "Consumer Group: $CONSUMER_GROUP"
print_info "Topic: $TOPIC"
print_info "Kafka Servers: $KAFKA_SERVERS"
echo ""

echo "Next steps:"
echo "  1. If consumer group doesn't exist:"
echo "     - Produce some messages to trigger offset commit"
echo "     - curl -X POST http://localhost:8080/spec-producer/produce"
echo ""
echo "  2. If consumer group is EMPTY:"
echo "     - Start the consumer"
echo "     - curl -X POST http://localhost:8080/spec-consumer/start"
echo ""
echo "  3. Check consumer is running:"
echo "     - curl http://localhost:8080/spec-consumer/status"
echo ""
echo "  4. Monitor logs:"
echo "     - tail -f /opt/tomcat/logs/spec-consumer.log"
echo ""

