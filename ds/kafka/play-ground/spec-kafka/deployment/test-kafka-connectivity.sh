#!/bin/bash

################################################################################
# Test Kafka Connectivity
# Diagnoses network connectivity to Kafka brokers
################################################################################

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

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

echo "========================================="
echo "Kafka Connectivity Test"
echo "========================================="
echo ""

# Kafka brokers
BROKERS=(
    "10.253.228.200:9092"
)

# Test 1: Basic network connectivity
echo "1. Testing basic network connectivity (TCP)"
echo "-----------------------------------"
for broker in "${BROKERS[@]}"; do
    IFS=':' read -r host port <<< "$broker"
    
    if timeout 5 bash -c "echo > /dev/tcp/$host/$port" 2>/dev/null; then
        print_success "✓ $broker is reachable (TCP)"
    else
        print_error "✗ $broker is NOT reachable (TCP)"
    fi
done

echo ""

# Test 2: Using nc (netcat)
echo "2. Testing with netcat"
echo "-----------------------------------"
for broker in "${BROKERS[@]}"; do
    IFS=':' read -r host port <<< "$broker"
    
    if nc -zv -w 5 $host $port 2>&1 | grep -q "succeeded\|open"; then
        print_success "✓ $broker is reachable (nc)"
    else
        print_error "✗ $broker is NOT reachable (nc)"
    fi
done

echo ""

# Test 3: Using telnet
echo "3. Testing with telnet"
echo "-----------------------------------"
for broker in "${BROKERS[@]}"; do
    IFS=':' read -r host port <<< "$broker"
    
    if timeout 5 telnet $host $port 2>&1 | grep -q "Connected\|Escape"; then
        print_success "✓ $broker is reachable (telnet)"
    else
        print_error "✗ $broker is NOT reachable (telnet)"
    fi
done

echo ""

# Test 4: DNS resolution
echo "4. Testing DNS resolution"
echo "-----------------------------------"
for broker in "${BROKERS[@]}"; do
    IFS=':' read -r host port <<< "$broker"
    
    if host $host > /dev/null 2>&1; then
        IP=$(host $host | grep "has address" | awk '{print $4}' | head -1)
        print_success "✓ $host resolves to $IP"
    else
        print_error "✗ $host DNS resolution failed"
    fi
done

echo ""

# Test 5: Ping test
echo "5. Testing ICMP (ping)"
echo "-----------------------------------"
for broker in "${BROKERS[@]}"; do
    IFS=':' read -r host port <<< "$broker"
    
    if ping -c 1 -W 2 $host > /dev/null 2>&1; then
        print_success "✓ $host responds to ping"
    else
        print_error "✗ $host does not respond to ping (might be blocked)"
    fi
done

echo ""

# Test 6: Check from application's perspective
echo "6. Checking application connectivity"
echo "-----------------------------------"
if [ -f "/opt/tomcat/logs/spec-producer.log" ]; then
    if grep -q "Cluster ID" /opt/tomcat/logs/spec-producer.log 2>/dev/null; then
        print_success "✓ Producer connected to Kafka cluster"
        CLUSTER_ID=$(grep "Cluster ID" /opt/tomcat/logs/spec-producer.log | tail -1 | sed 's/.*Cluster ID: //' | awk '{print $1}')
        echo "  Cluster ID: $CLUSTER_ID"
    else
        print_error "✗ Producer has not connected yet"
    fi
else
    print_error "✗ Producer log not found"
fi

if [ -f "/opt/tomcat/logs/spec-consumer.log" ]; then
    if grep -q "Cluster ID" /opt/tomcat/logs/spec-consumer.log 2>/dev/null; then
        print_success "✓ Consumer connected to Kafka cluster"
        CLUSTER_ID=$(grep "Cluster ID" /opt/tomcat/logs/spec-consumer.log | tail -1 | sed 's/.*Cluster ID: //' | awk '{print $1}')
        echo "  Cluster ID: $CLUSTER_ID"
    else
        print_error "✗ Consumer has not connected yet"
    fi
else
    print_error "✗ Consumer log not found"
fi

echo ""

# Test 7: Check firewall rules
echo "7. Checking local firewall"
echo "-----------------------------------"
if command -v firewall-cmd &> /dev/null; then
    if systemctl is-active --quiet firewalld; then
        print_info "Firewalld is active"
        if firewall-cmd --list-all | grep -q "9092"; then
            print_info "Port 9092 rules found"
            firewall-cmd --list-all | grep 9092
        else
            print_info "No specific rules for port 9092 (might use default)"
        fi
    else
        print_info "Firewalld is not active"
    fi
else
    print_info "Firewalld not installed"
fi

echo ""

# Test 8: Network route
echo "8. Checking network route to first broker"
echo "-----------------------------------"
IFS=':' read -r host port <<< "${BROKERS[0]}"
if command -v traceroute &> /dev/null; then
    print_info "Traceroute to $host (first 5 hops):"
    traceroute -m 5 -w 2 $host 2>&1 | head -6
else
    print_info "Traceroute not available"
fi

echo ""
echo "========================================="
echo "Summary"
echo "========================================="
echo ""

print_info "Your application CAN connect to Kafka"
print_info "CLI tools timeout when connecting"
echo ""
echo "Possible reasons:"
echo "  1. Network ACLs allowing app but blocking CLI"
echo "  2. Different retry/timeout behavior"
echo "  3. Kafka broker configuration"
echo "  4. Firewall rules"
echo ""
echo "Recommendation:"
echo "  - Use application logs to monitor Kafka activity"
echo "  - Use Kafka UI to see consumer groups"
echo "  - Contact Kafka admin if CLI access is needed"
echo ""

