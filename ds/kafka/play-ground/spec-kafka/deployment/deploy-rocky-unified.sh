#!/bin/bash

################################################################################
# Universal Deployment Script for Rocky Linux
# Handles both initial deployment and redeployment
# Usage: ./deploy.sh [options]
#   Options:
#     --skip-build    Skip Maven build
#     --skip-kafka    Skip Kafka connectivity check
#     --wait N        Wait N seconds for deployment (default: 40)
################################################################################

set -e

# Configuration
TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}
WEBAPPS_DIR="$TOMCAT_HOME/webapps"
LOGS_DIR="$TOMCAT_HOME/logs"
HOST_IP=$(hostname -I | awk '{print $1}')
HOST_IP=${HOST_IP:-localhost}
SKIP_BUILD=false
SKIP_KAFKA=false
WAIT_TIME=40

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

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --skip-kafka)
            SKIP_KAFKA=true
            shift
            ;;
        --wait)
            WAIT_TIME="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --skip-build    Skip Maven build (use existing WARs)"
            echo "  --skip-kafka    Skip Kafka connectivity check"
            echo "  --wait N        Wait N seconds for deployment (default: 40)"
            echo "  -h, --help      Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                          # Full deployment"
            echo "  $0 --skip-build             # Redeploy without rebuilding"
            echo "  $0 --skip-kafka --wait 60   # Skip Kafka check, wait 60s"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

echo "========================================="
echo "Spec Kafka Deployment - Rocky Linux"
echo "========================================="
print_info "Tomcat Home: $TOMCAT_HOME"
print_info "Webapps Dir: $WEBAPPS_DIR"
echo ""

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    print_warning "Not running as root. Some operations may require sudo."
    SUDO="sudo"
else
    SUDO=""
fi

# Verify Tomcat structure
if [ ! -d "$WEBAPPS_DIR" ]; then
    print_error "Tomcat webapps directory not found at $WEBAPPS_DIR"
    echo ""
    print_info "Current structure:"
    ls -la $TOMCAT_HOME/ 2>/dev/null || ls -la /opt/ | grep tomcat
    echo ""
    print_info "Please run the fix script first:"
    echo "  sudo ./fix-tomcat-structure.sh"
    exit 1
fi

# Check Kafka connectivity (unless skipped)
if [ "$SKIP_KAFKA" = false ]; then
    echo ""
    print_info "Checking Kafka cluster connectivity..."
    KAFKA_SERVERS=("10.253.228.200")
    KAFKA_REACHABLE=false

    for server in "${KAFKA_SERVERS[@]}"; do
        if nc -z "$server" 9092 2>/dev/null; then
            print_success "Kafka broker reachable: $server:9092"
            KAFKA_REACHABLE=true
            break
        fi
    done

    if [ "$KAFKA_REACHABLE" = false ]; then
        print_warning "Cannot reach Kafka cluster"
        print_info "Server: 10.253.228.200:9092"
        print_info "Application will deploy but may not function correctly"
    fi
fi

# Build project (unless skipped)
if [ "$SKIP_BUILD" = false ]; then
    echo ""
    print_info "Building project with Maven..."
    if mvn clean install -DskipTests; then
        print_success "Build complete"
    else
        print_error "Build failed"
        exit 1
    fi
    
    # Verify WAR files exist
    if [ ! -f "spec-producer-webapp/target/spec-producer.war" ]; then
        print_error "spec-producer.war not found after build"
        exit 1
    fi
    if [ ! -f "spec-consumer-webapp/target/spec-consumer.war" ]; then
        print_error "spec-consumer.war not found after build"
        exit 1
    fi
else
    print_info "Skipping build (using existing WAR files)"
    
    # Verify WAR files exist
    if [ ! -f "spec-producer-webapp/target/spec-producer.war" ] || [ ! -f "spec-consumer-webapp/target/spec-consumer.war" ]; then
        print_error "WAR files not found. Please build first or remove --skip-build"
        exit 1
    fi
fi

# Stop Tomcat
echo ""
print_info "Stopping Tomcat..."
$SUDO systemctl stop tomcat 2>/dev/null || true
sleep 3

# Force kill any remaining Tomcat processes
if pgrep -f tomcat > /dev/null; then
    print_warning "Force killing remaining Tomcat processes..."
    $SUDO pkill -9 -f tomcat 2>/dev/null || true
    sleep 2
fi

print_success "Tomcat stopped"

# Clean old deployments
echo ""
print_info "Cleaning old deployments..."
$SUDO rm -rf $WEBAPPS_DIR/spec-producer*
$SUDO rm -rf $WEBAPPS_DIR/spec-consumer*
print_success "Old deployments removed"

# Deploy new WARs
echo ""
print_info "Deploying new WAR files..."
$SUDO cp spec-producer-webapp/target/spec-producer.war $WEBAPPS_DIR/
$SUDO cp spec-consumer-webapp/target/spec-consumer.war $WEBAPPS_DIR/

# Set ownership
if id tomcat &>/dev/null; then
    $SUDO chown tomcat:tomcat $WEBAPPS_DIR/spec-*.war
    print_success "WARs deployed with correct ownership"
else
    print_success "WARs deployed"
    print_warning "Tomcat user not found, ownership not set"
fi

# Start Tomcat
echo ""
print_info "Starting Tomcat..."

# Check if systemd service exists
if ! systemctl list-unit-files | grep -q "tomcat.service"; then
    print_error "Tomcat systemd service not found"
    echo ""
    print_info "Please set up the Tomcat service first:"
    echo "  sudo ./deployment/setup-tomcat-service.sh"
    echo ""
    print_info "Or start Tomcat manually:"
    echo "  $TOMCAT_HOME/bin/startup.sh"
    exit 1
fi

$SUDO systemctl start tomcat

# Verify Tomcat started
sleep 3
if $SUDO systemctl is-active --quiet tomcat; then
    print_success "Tomcat started successfully"
else
    print_error "Tomcat failed to start"
    print_info "Check logs: journalctl -u tomcat -n 50"
    exit 1
fi

# Wait for deployment with progress indicator
echo ""
print_info "Waiting for applications to deploy (up to $WAIT_TIME seconds)..."

DEPLOYED=false
for i in $(seq 1 $WAIT_TIME); do
    sleep 1
    
    # Check if both applications are deployed
    if [ -d "$WEBAPPS_DIR/spec-consumer" ] && [ -d "$WEBAPPS_DIR/spec-producer" ]; then
        print_success "Applications deployed after $i seconds"
        DEPLOYED=true
        break
    fi
    
    # Progress indicator every 10 seconds
    if [ $((i % 10)) -eq 0 ]; then
        echo "  ... still waiting ($i seconds)"
    fi
done

if [ "$DEPLOYED" = false ]; then
    print_warning "Applications not fully deployed after $WAIT_TIME seconds"
    print_info "Check deployment status:"
    ls -la $WEBAPPS_DIR/ | grep spec-
fi

# Additional wait for application startup
echo ""
print_info "Waiting for application initialization (10 seconds)..."
sleep 10

# Test endpoints
echo ""
print_info "Testing application endpoints..."

PRODUCER_OK=false
CONSUMER_OK=false

if curl -s http://localhost:8080/spec-producer/status > /dev/null 2>&1; then
    print_success "Producer is accessible: http://$HOST_IP:8080/spec-producer"
    PRODUCER_OK=true
else
    print_warning "Producer not accessible yet: http://$HOST_IP:8080/spec-producer"
fi

if curl -s http://localhost:8080/spec-consumer/status > /dev/null 2>&1; then
    print_success "Consumer is accessible: http://$HOST_IP:8080/spec-consumer"
    CONSUMER_OK=true
else
    print_warning "Consumer not accessible yet: http://$HOST_IP:8080/spec-consumer"
fi

# Final status
echo ""
echo "========================================="
if [ "$PRODUCER_OK" = true ] && [ "$CONSUMER_OK" = true ]; then
    echo -e "${GREEN}✓ Deployment Successful!${NC}"
else
    echo -e "${YELLOW}⚠ Deployment Completed with Warnings${NC}"
fi
echo "========================================="
echo ""

# Display application URLs
echo "Application URLs:"
echo "  Producer: http://$HOST_IP:8080/spec-producer"
echo "  Consumer: http://$HOST_IP:8080/spec-consumer"
echo ""

# Display API endpoints
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

# Display log commands
echo "View Logs:"
echo "  Producer: tail -f $LOGS_DIR/spec-producer.log"
echo "  Consumer: tail -f $LOGS_DIR/spec-consumer.log"
echo "  Tomcat:   tail -f $LOGS_DIR/catalina.out"
echo "  Journal:  journalctl -u tomcat -f"
echo ""

# Display management commands
echo "Manage Tomcat:"
echo "  systemctl status tomcat"
echo "  systemctl stop tomcat"
echo "  systemctl restart tomcat"
echo ""

# Show troubleshooting tips if there were issues
if [ "$PRODUCER_OK" = false ] || [ "$CONSUMER_OK" = false ]; then
    echo "Troubleshooting:"
    echo "  1. Check logs for errors:"
    echo "     tail -100 $LOGS_DIR/catalina.out | grep -i error"
    echo ""
    echo "  2. Wait a bit longer and test again:"
    echo "     sleep 30"
    echo "     curl http://$HOST_IP:8080/spec-producer/status"
    echo "     curl http://$HOST_IP:8080/spec-consumer/status"
    echo ""
    echo "  3. Check if Kafka topic exists:"
    echo "     kafka-topics.sh --list --bootstrap-server 10.253.228.200:9092"
    echo ""
fi

# Exit with appropriate code
if [ "$PRODUCER_OK" = true ] && [ "$CONSUMER_OK" = true ]; then
    exit 0
else
    exit 1
fi

