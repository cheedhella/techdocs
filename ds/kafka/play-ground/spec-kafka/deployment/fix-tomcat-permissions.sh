#!/bin/bash

################################################################################
# Fix Tomcat Permissions
# Fixes ownership and permissions for Tomcat directories
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
echo "Fix Tomcat Permissions"
echo "========================================="
echo ""

# Find Tomcat installation
TOMCAT_HOME=""
if [ -L "/opt/tomcat" ]; then
    TOMCAT_HOME=$(readlink -f /opt/tomcat)
    print_info "Found Tomcat symlink: /opt/tomcat -> $TOMCAT_HOME"
elif [ -d "/opt/tomcat" ]; then
    TOMCAT_HOME="/opt/tomcat"
    print_info "Found Tomcat at: $TOMCAT_HOME"
elif [ -d "/opt/apache-tomcat-9.0.96" ]; then
    TOMCAT_HOME="/opt/apache-tomcat-9.0.96"
    print_info "Found Tomcat at: $TOMCAT_HOME"
else
    print_error "Tomcat installation not found"
    exit 1
fi

# Check if tomcat user exists
if ! id tomcat &>/dev/null; then
    print_error "Tomcat user does not exist"
    echo "Creating tomcat user..."
    useradd -r -m -U -d /opt/tomcat -s /bin/false tomcat
    print_success "Tomcat user created"
fi

# Stop Tomcat if running
print_info "Stopping Tomcat..."
systemctl stop tomcat 2>/dev/null || true
pkill -9 -f tomcat 2>/dev/null || true
sleep 2
print_success "Tomcat stopped"

# Fix ownership of Tomcat directory
print_info "Setting ownership of $TOMCAT_HOME..."
chown -R tomcat:tomcat $TOMCAT_HOME
print_success "Ownership set to tomcat:tomcat"

# Fix symlink ownership if exists
if [ -L "/opt/tomcat" ] && [ "$TOMCAT_HOME" != "/opt/tomcat" ]; then
    print_info "Fixing symlink ownership..."
    chown -h tomcat:tomcat /opt/tomcat
    print_success "Symlink ownership fixed"
fi

# Set correct permissions for directories
print_info "Setting directory permissions..."
chmod 755 $TOMCAT_HOME
chmod 755 $TOMCAT_HOME/bin
chmod 755 $TOMCAT_HOME/lib
chmod 755 $TOMCAT_HOME/conf
chmod 755 $TOMCAT_HOME/webapps
chmod 755 $TOMCAT_HOME/temp
chmod 755 $TOMCAT_HOME/logs
chmod 755 $TOMCAT_HOME/work
print_success "Directory permissions set"

# Make scripts executable
print_info "Making scripts executable..."
chmod +x $TOMCAT_HOME/bin/*.sh
print_success "Scripts are executable"

# Set permissions for conf files
print_info "Setting config file permissions..."
chmod 640 $TOMCAT_HOME/conf/*
chmod 750 $TOMCAT_HOME/conf
print_success "Config permissions set"

# Ensure logs directory is writable
print_info "Ensuring logs directory is writable..."
chmod 770 $TOMCAT_HOME/logs
print_success "Logs directory is writable"

# Ensure temp directory is writable
print_info "Ensuring temp directory is writable..."
chmod 770 $TOMCAT_HOME/temp
print_success "Temp directory is writable"

# Ensure work directory is writable
print_info "Ensuring work directory is writable..."
chmod 770 $TOMCAT_HOME/work
print_success "Work directory is writable"

# Ensure webapps directory is writable
print_info "Ensuring webapps directory is writable..."
chmod 770 $TOMCAT_HOME/webapps
print_success "Webapps directory is writable"

# Verify permissions
echo ""
print_info "Verifying permissions..."
echo "-----------------------------------"
ls -la $TOMCAT_HOME/ | head -15
echo "-----------------------------------"

# Test write access
echo ""
print_info "Testing write access..."

# Test logs directory
if sudo -u tomcat touch $TOMCAT_HOME/logs/test.txt 2>/dev/null; then
    sudo -u tomcat rm -f $TOMCAT_HOME/logs/test.txt
    print_success "Logs directory is writable by tomcat user"
else
    print_error "Logs directory is NOT writable by tomcat user"
fi

# Test temp directory
if sudo -u tomcat touch $TOMCAT_HOME/temp/test.txt 2>/dev/null; then
    sudo -u tomcat rm -f $TOMCAT_HOME/temp/test.txt
    print_success "Temp directory is writable by tomcat user"
else
    print_error "Temp directory is NOT writable by tomcat user"
fi

# Test webapps directory
if sudo -u tomcat touch $TOMCAT_HOME/webapps/test.txt 2>/dev/null; then
    sudo -u tomcat rm -f $TOMCAT_HOME/webapps/test.txt
    print_success "Webapps directory is writable by tomcat user"
else
    print_error "Webapps directory is NOT writable by tomcat user"
fi

echo ""
echo "========================================="
print_success "Permissions Fixed!"
echo "========================================="
echo ""

echo "You can now start Tomcat:"
echo "  systemctl start tomcat"
echo "  systemctl status tomcat"
echo ""

# Ask if user wants to start now
read -p "Do you want to start Tomcat now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Starting Tomcat..."
    systemctl start tomcat
    sleep 5
    
    if systemctl is-active --quiet tomcat; then
        print_success "Tomcat started successfully!"
        echo ""
        echo "Test Tomcat:"
        echo "  curl http://localhost:8080"
        echo ""
        echo "View logs:"
        echo "  tail -f $TOMCAT_HOME/logs/catalina.out"
        echo "  journalctl -u tomcat -f"
    else
        print_error "Tomcat failed to start"
        echo ""
        echo "Check logs:"
        echo "  journalctl -u tomcat -n 50"
        echo "  tail -50 $TOMCAT_HOME/logs/catalina.out"
    fi
else
    print_info "Start Tomcat manually when ready:"
    echo "  systemctl start tomcat"
fi

echo ""

