#!/bin/bash

################################################################################
# Setup Tomcat Systemd Service
# Creates systemd service for Tomcat if it doesn't exist
################################################################################

set -e

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

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "This script must be run as root"
    echo "Please run: sudo $0"
    exit 1
fi

echo "========================================="
echo "Tomcat Systemd Service Setup"
echo "========================================="
echo ""

# Find Tomcat installation
TOMCAT_HOME=""
if [ -d "/opt/tomcat" ]; then
    TOMCAT_HOME="/opt/tomcat"
elif [ -d "/opt/apache-tomcat-9.0.96" ]; then
    TOMCAT_HOME="/opt/apache-tomcat-9.0.96"
else
    print_error "Tomcat installation not found"
    echo "Expected locations:"
    echo "  - /opt/tomcat"
    echo "  - /opt/apache-tomcat-9.0.96"
    exit 1
fi

print_info "Found Tomcat at: $TOMCAT_HOME"

# Find Java home
if [ -n "$JAVA_HOME" ]; then
    print_info "Using JAVA_HOME: $JAVA_HOME"
elif command -v java &> /dev/null; then
    JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
    print_info "Detected JAVA_HOME: $JAVA_HOME"
else
    print_error "Java not found"
    echo "Please install Java first:"
    echo "  sudo dnf install -y java-17-openjdk java-17-openjdk-devel"
    exit 1
fi

# Check if tomcat user exists
if ! id tomcat &>/dev/null; then
    print_info "Creating tomcat user..."
    useradd -r -m -U -d /opt/tomcat -s /bin/false tomcat
    print_success "Tomcat user created"
else
    print_info "Tomcat user already exists"
fi

# Set ownership
print_info "Setting ownership..."
chown -R tomcat:tomcat $TOMCAT_HOME

# Fix symlink ownership if exists
if [ -L "/opt/tomcat" ] && [ "$TOMCAT_HOME" != "/opt/tomcat" ]; then
    chown -h tomcat:tomcat /opt/tomcat
fi

print_success "Ownership set"

# Set correct permissions
print_info "Setting permissions..."

# Directory permissions
chmod 755 $TOMCAT_HOME
chmod 755 $TOMCAT_HOME/bin
chmod 755 $TOMCAT_HOME/lib
chmod 755 $TOMCAT_HOME/conf
chmod 755 $TOMCAT_HOME/webapps

# Writable directories for tomcat user
chmod 770 $TOMCAT_HOME/logs
chmod 770 $TOMCAT_HOME/temp
chmod 770 $TOMCAT_HOME/work

# Make scripts executable
chmod +x $TOMCAT_HOME/bin/*.sh

# Config files
chmod 640 $TOMCAT_HOME/conf/* 2>/dev/null || true

print_success "Permissions set"

# Check if service already exists
if systemctl list-unit-files | grep -q "tomcat.service"; then
    print_info "Tomcat service already exists"
    read -p "Do you want to recreate it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Keeping existing service"
        exit 0
    fi
    systemctl stop tomcat 2>/dev/null || true
    systemctl disable tomcat 2>/dev/null || true
fi

# Create systemd service file
print_info "Creating systemd service file..."

cat > /etc/systemd/system/tomcat.service << EOF
[Unit]
Description=Apache Tomcat 9 Web Application Server
After=network.target

[Service]
Type=forking

User=tomcat
Group=tomcat

Environment="JAVA_HOME=$JAVA_HOME"
Environment="CATALINA_HOME=$TOMCAT_HOME"
Environment="CATALINA_BASE=$TOMCAT_HOME"
Environment="CATALINA_PID=$TOMCAT_HOME/temp/tomcat.pid"
Environment="CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC"

ExecStart=$TOMCAT_HOME/bin/startup.sh
ExecStop=$TOMCAT_HOME/bin/shutdown.sh

Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

print_success "Service file created: /etc/systemd/system/tomcat.service"

# Reload systemd
print_info "Reloading systemd daemon..."
systemctl daemon-reload
print_success "Systemd reloaded"

# Enable service
print_info "Enabling Tomcat service..."
systemctl enable tomcat
print_success "Tomcat service enabled"

# Display service file
echo ""
print_info "Service configuration:"
echo "-----------------------------------"
cat /etc/systemd/system/tomcat.service
echo "-----------------------------------"

echo ""
echo "========================================="
print_success "Tomcat Service Setup Complete!"
echo "========================================="
echo ""

echo "Service Commands:"
echo "  Start:   systemctl start tomcat"
echo "  Stop:    systemctl stop tomcat"
echo "  Restart: systemctl restart tomcat"
echo "  Status:  systemctl status tomcat"
echo "  Logs:    journalctl -u tomcat -f"
echo ""

# Ask if user wants to start now
read -p "Do you want to start Tomcat now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Starting Tomcat..."
    systemctl start tomcat
    sleep 3
    
    if systemctl is-active --quiet tomcat; then
        print_success "Tomcat started successfully"
        echo ""
        echo "Test Tomcat:"
        echo "  curl http://localhost:8080"
    else
        print_error "Tomcat failed to start"
        echo ""
        echo "Check logs:"
        echo "  journalctl -u tomcat -n 50"
        echo "  tail -50 $TOMCAT_HOME/logs/catalina.out"
    fi
else
    print_info "Tomcat not started. Start it manually with:"
    echo "  systemctl start tomcat"
fi

echo ""

