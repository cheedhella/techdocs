#!/bin/bash

################################################################################
# Fix Tomcat Directory Structure
# Fixes incorrect /opt/tomcat directory structure
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
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "This script must be run as root"
    echo "Please run: sudo $0"
    exit 1
fi

print_info "Current /opt/tomcat structure:"
ls -la /opt/tomcat/ 2>/dev/null || ls -la /opt/ | grep tomcat

echo ""
print_info "Fixing Tomcat directory structure..."

# Stop Tomcat if running
print_info "Stopping Tomcat service..."
systemctl stop tomcat 2>/dev/null || true
pkill -9 -f tomcat 2>/dev/null || true
sleep 2

# Check if /opt/apache-tomcat-9.0.96 exists
if [ -d "/opt/apache-tomcat-9.0.96" ]; then
    print_info "Found Tomcat installation at /opt/apache-tomcat-9.0.96"
    
    # Remove the incorrect /opt/tomcat directory
    print_info "Removing incorrect /opt/tomcat directory..."
    rm -rf /opt/tomcat
    
    # Create correct symlink
    print_info "Creating correct symlink..."
    ln -s /opt/apache-tomcat-9.0.96 /opt/tomcat
    
    print_success "Symlink created: /opt/tomcat -> /opt/apache-tomcat-9.0.96"
else
    print_error "/opt/apache-tomcat-9.0.96 not found"
    
    # Check if it's inside /opt/tomcat
    if [ -d "/opt/tomcat/apache-tomcat-9.0.96" ]; then
        print_info "Found nested installation at /opt/tomcat/apache-tomcat-9.0.96"
        
        # Move it up
        print_info "Moving to /opt/apache-tomcat-9.0.96..."
        mv /opt/tomcat/apache-tomcat-9.0.96 /opt/apache-tomcat-9.0.96
        
        # Remove old directory
        rm -rf /opt/tomcat
        
        # Create correct symlink
        ln -s /opt/apache-tomcat-9.0.96 /opt/tomcat
        
        print_success "Fixed nested installation"
    else
        print_error "Cannot find Tomcat installation"
        exit 1
    fi
fi

# Verify the fix
print_info "Verifying installation..."

if [ -L "/opt/tomcat" ]; then
    print_success "✓ /opt/tomcat is a symlink"
    TARGET=$(readlink -f /opt/tomcat)
    print_info "  Points to: $TARGET"
else
    print_error "✗ /opt/tomcat is not a symlink"
    exit 1
fi

if [ -d "/opt/tomcat/bin" ]; then
    print_success "✓ /opt/tomcat/bin exists"
else
    print_error "✗ /opt/tomcat/bin not found"
    exit 1
fi

if [ -d "/opt/tomcat/webapps" ]; then
    print_success "✓ /opt/tomcat/webapps exists"
else
    print_error "✗ /opt/tomcat/webapps not found"
    exit 1
fi

if [ -f "/opt/tomcat/bin/catalina.sh" ]; then
    print_success "✓ /opt/tomcat/bin/catalina.sh exists"
else
    print_error "✗ /opt/tomcat/bin/catalina.sh not found"
    exit 1
fi

# Fix permissions
print_info "Setting correct permissions..."
TOMCAT_USER="tomcat"
TOMCAT_GROUP="tomcat"

if id "$TOMCAT_USER" &>/dev/null; then
    chown -R $TOMCAT_USER:$TOMCAT_GROUP /opt/apache-tomcat-*
    chown -h $TOMCAT_USER:$TOMCAT_GROUP /opt/tomcat
    print_success "Permissions set for user: $TOMCAT_USER"
else
    print_info "Tomcat user not found, skipping permission change"
fi

# Make scripts executable
chmod +x /opt/tomcat/bin/*.sh
print_success "Made Tomcat scripts executable"

# Show final structure
echo ""
print_success "Final structure:"
echo "-----------------------------------"
ls -la /opt/ | grep tomcat
echo ""
echo "Tomcat directories:"
ls -la /opt/tomcat/ | head -10
echo ""
echo "-----------------------------------"

print_success "Tomcat structure fixed successfully!"
echo ""
echo "You can now:"
echo "  1. Start Tomcat: systemctl start tomcat"
echo "  2. Or manually: /opt/tomcat/bin/catalina.sh start"
echo "  3. Deploy apps: cp *.war /opt/tomcat/webapps/"
echo "  4. View logs: tail -f /opt/tomcat/logs/catalina.out"

