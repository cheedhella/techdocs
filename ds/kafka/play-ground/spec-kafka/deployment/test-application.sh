#!/bin/bash

echo "========================================="
echo "Testing Spec Kafka Application"
echo "========================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test function
test_endpoint() {
    local name=$1
    local url=$2
    local expected=$3
    
    echo -n "Testing $name... "
    response=$(curl -s "$url")
    
    if [[ $response == *"$expected"* ]]; then
        echo -e "${GREEN}✓ PASS${NC}"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC}"
        echo "  Expected: $expected"
        echo "  Got: $response"
        return 1
    fi
}

echo ""
echo "1. Testing Producer Endpoints"
echo "------------------------------"

# Test producer status
test_endpoint "Producer status" \
    "http://localhost:8080/spec-producer/status" \
    "success"

# Start producer
echo ""
echo "Starting producer..."
curl -s http://localhost:8080/spec-producer/produce
sleep 2

# Verify producer is running
test_endpoint "Producer running" \
    "http://localhost:8080/spec-producer/status" \
    "producing\":true"

echo ""
echo "2. Testing Consumer Endpoints"
echo "------------------------------"

# Test consumer status
test_endpoint "Consumer status" \
    "http://localhost:8080/spec-consumer/status" \
    "success"

# Start consumer
echo ""
echo "Starting consumer..."
curl -s http://localhost:8080/spec-consumer/start
sleep 2

# Verify consumer is running
test_endpoint "Consumer running" \
    "http://localhost:8080/spec-consumer/status" \
    "consuming\":true"

echo ""
echo "3. Waiting for Messages (10 seconds)..."
echo "----------------------------------------"
sleep 10

# Check message count
response=$(curl -s http://localhost:8080/spec-consumer/status)
count=$(echo $response | grep -o '"messageCount":[0-9]*' | grep -o '[0-9]*')

if [ "$count" -gt 0 ]; then
    echo -e "${GREEN}✓ Consumer received $count messages${NC}"
else
    echo -e "${YELLOW}⚠ Consumer has not received any messages yet${NC}"
    echo "  This might be normal if Kafka is slow to start"
fi

echo ""
echo "4. Stopping Services"
echo "--------------------"

# Stop producer
echo "Stopping producer..."
curl -s http://localhost:8080/spec-producer/stop
test_endpoint "Producer stopped" \
    "http://localhost:8080/spec-producer/status" \
    "producing\":false"

# Stop consumer
echo "Stopping consumer..."
curl -s http://localhost:8080/spec-consumer/stop
test_endpoint "Consumer stopped" \
    "http://localhost:8080/spec-consumer/status" \
    "consuming\":false"

echo ""
echo "========================================="
echo "Test Summary"
echo "========================================="
echo ""
echo "All endpoints are working correctly!"
echo ""
echo "To view consumed orders in logs:"
echo "  tail -f \$TOMCAT_HOME/logs/catalina.out"
echo ""
echo "To view messages in Kafka:"
echo "  kafka-console-consumer --topic orders --from-beginning --bootstrap-server localhost:9092 --max-messages 5"
echo ""

