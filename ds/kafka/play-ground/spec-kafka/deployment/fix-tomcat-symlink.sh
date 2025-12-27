#!/bin/bash

################################################################################
# Fix Tomcat Symlink Script
# Fixes incorrect /opt/tomcat symlink pointing to nested directory
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

print_info "Checking current Tomcat installation..."

# Check if /opt/tomcat exists
if [ ! -e "/opt/tomcat" ]; then
    print_error "/opt/tomcat does not exist"
    exit 1
fi

# Show current structure
print_info "Current structure:"
ls -la /opt/tomcat/ 2>/dev/null || true

# Find the actual Tomcat installation
TOMCAT_DIR=$(find /opt -maxdepth 2 -type d -name "apache-tomcat-*" 2>/dev/null | head -1)

if [ -z "$TOMCAT_DIR" ]; then
    print_error "Could not find Tomcat installation in /opt"
    exit 1
fi

print_info "Found Tomcat at: $TOMCAT_DIR"

# Check if it's a nested installation (e.g., /opt/tomcat/apache-tomcat-9.0.96)
if [[ "$TOMCAT_DIR" == /opt/tomcat/* ]]; then
    print_info "Detected nested Tomcat installation"
    
    # Stop Tomcat if running
    print_info "Stopping Tomcat service..."
    systemctl stop tomcat 2>/dev/null || true
    
    # Move the nested directory up
    TOMCAT_VERSION=$(basename "$TOMCAT_DIR")
    print_info "Moving $TOMCAT_VERSION to /opt/"
    
    # Remove the symlink
    rm -f /opt/tomcat
    
    # Move the directory
    mv "$TOMCAT_DIR" /opt/
    
    # Create correct symlink
    ln -s /opt/$TOMCAT_VERSION /opt/tomcat
    
    print_success "Fixed Tomcat installation structure"
else
    print_info "Tomcat is already in correct location"
    
    # Just recreate the symlink
    rm -f /opt/tomcat
    ln -s "$TOMCAT_DIR" /opt/tomcat
    
    print_success "Recreated symlink"
fi

# Verify the fix
print_info "Verifying installation..."

if [ -d "/opt/tomcat/bin" ]; then
    print_success "✓ /opt/tomcat/bin exists"
else
    print_error "✗ /opt/tomcat/bin not found"
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
print_info "Final structure:"
ls -la /opt/ | grep tomcat
echo ""
ls -la /opt/tomcat/bin/*.sh | head -5

print_success "Tomcat symlink fixed successfully!"
echo ""
echo "You can now:"
echo "  1. Start Tomcat: systemctl start tomcat"
echo "  2. Check status: systemctl status tomcat"
echo "  3. View logs: tail -f /opt/tomcat/logs/catalina.out"

