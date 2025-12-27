#!/bin/bash

################################################################################
# Dependency Installation Script for Rocky Linux
# Installs: JDK 17, Maven, Apache Tomcat 9
################################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
JDK_VERSION="17"
MAVEN_VERSION="3.9.5"
TOMCAT_VERSION="9.0.84"
INSTALL_DIR="/opt"
TOMCAT_USER="tomcat"
TOMCAT_GROUP="tomcat"

# Function to print colored messages
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        print_error "This script must be run as root"
        echo "Please run: sudo $0"
        exit 1
    fi
}

# Function to check Rocky Linux version
check_os() {
    if [ ! -f /etc/rocky-release ]; then
        print_error "This script is designed for Rocky Linux"
        exit 1
    fi
    
    ROCKY_VERSION=$(cat /etc/rocky-release)
    print_info "Detected: $ROCKY_VERSION"
}

# Function to install JDK
install_jdk() {
    print_info "Installing OpenJDK $JDK_VERSION..."
    
    # Check if already installed
    if command -v java &> /dev/null; then
        CURRENT_VERSION=$(java -version 2>&1 | head -n 1 | awk -F '"' '{print $2}')
        print_warning "Java is already installed: $CURRENT_VERSION"
        read -p "Do you want to reinstall? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Skipping JDK installation"
            return
        fi
    fi
    
    # Install OpenJDK
    dnf install -y java-${JDK_VERSION}-openjdk java-${JDK_VERSION}-openjdk-devel
    
    # Set JAVA_HOME
    JAVA_HOME_PATH=$(dirname $(dirname $(readlink -f $(which java))))
    
    # Add to /etc/profile.d/
    cat > /etc/profile.d/java.sh << EOF
export JAVA_HOME=$JAVA_HOME_PATH
export PATH=\$JAVA_HOME/bin:\$PATH
EOF
    
    chmod +x /etc/profile.d/java.sh
    source /etc/profile.d/java.sh
    
    # Verify installation
    java -version
    print_success "JDK $JDK_VERSION installed successfully"
    print_info "JAVA_HOME: $JAVA_HOME"
}

# Function to install Maven
install_maven() {
    print_info "Installing Apache Maven $MAVEN_VERSION..."
    
    # Check if already installed
    if command -v mvn &> /dev/null; then
        CURRENT_VERSION=$(mvn -version | head -n 1 | awk '{print $3}')
        print_warning "Maven is already installed: $CURRENT_VERSION"
        read -p "Do you want to reinstall? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Skipping Maven installation"
            return
        fi
        # Remove old installation
        rm -rf $INSTALL_DIR/maven
        rm -f /usr/local/bin/mvn
    fi
    
    # Download Maven
    cd /tmp
    MAVEN_URL="https://dlcdn.apache.org/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz"
    
    print_info "Downloading Maven from $MAVEN_URL"
    wget $MAVEN_URL -O apache-maven-${MAVEN_VERSION}-bin.tar.gz
    
    # Extract and install
    tar -xzf apache-maven-${MAVEN_VERSION}-bin.tar.gz
    mv apache-maven-${MAVEN_VERSION} $INSTALL_DIR/maven
    
    # Create symlink
    ln -sf $INSTALL_DIR/maven/bin/mvn /usr/local/bin/mvn
    
    # Set Maven environment
    cat > /etc/profile.d/maven.sh << EOF
export M2_HOME=$INSTALL_DIR/maven
export MAVEN_HOME=$INSTALL_DIR/maven
export PATH=\$MAVEN_HOME/bin:\$PATH
EOF
    
    chmod +x /etc/profile.d/maven.sh
    source /etc/profile.d/maven.sh
    
    # Cleanup
    rm -f apache-maven-${MAVEN_VERSION}-bin.tar.gz
    
    # Verify installation
    mvn -version
    print_success "Maven $MAVEN_VERSION installed successfully"
}

# Function to create Tomcat user
create_tomcat_user() {
    if id "$TOMCAT_USER" &>/dev/null; then
        print_info "User $TOMCAT_USER already exists"
    else
        print_info "Creating Tomcat user..."
        useradd -r -m -U -d /opt/tomcat -s /bin/false $TOMCAT_USER
        print_success "User $TOMCAT_USER created"
    fi
}

# Function to install Tomcat
install_tomcat() {
    print_info "Installing Apache Tomcat $TOMCAT_VERSION..."
    
    # Check if already installed
    if [ -d "$INSTALL_DIR/tomcat" ]; then
        print_warning "Tomcat is already installed at $INSTALL_DIR/tomcat"
        read -p "Do you want to reinstall? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Skipping Tomcat installation"
            return
        fi
        # Stop Tomcat if running
        systemctl stop tomcat 2>/dev/null || true
        rm -rf $INSTALL_DIR/tomcat*
    fi
    
    # Create Tomcat user
    create_tomcat_user
    
    # Download Tomcat
    cd /tmp
    TOMCAT_URL="https://dlcdn.apache.org/tomcat/tomcat-9/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz"
    
    print_info "Downloading Tomcat from $TOMCAT_URL"
    wget $TOMCAT_URL -O apache-tomcat-${TOMCAT_VERSION}.tar.gz
    
    # Extract and install
    tar -xzf apache-tomcat-${TOMCAT_VERSION}.tar.gz -C $INSTALL_DIR
    
    # Create symlink
    ln -s $INSTALL_DIR/apache-tomcat-${TOMCAT_VERSION} $INSTALL_DIR/tomcat
    
    # Set ownership
    chown -R $TOMCAT_USER:$TOMCAT_GROUP $INSTALL_DIR/apache-tomcat-${TOMCAT_VERSION}
    chown -h $TOMCAT_USER:$TOMCAT_GROUP $INSTALL_DIR/tomcat
    
    # Make scripts executable
    chmod +x $INSTALL_DIR/tomcat/bin/*.sh
    
    # Set Tomcat environment
    cat > /etc/profile.d/tomcat.sh << EOF
export CATALINA_HOME=$INSTALL_DIR/tomcat
export PATH=\$CATALINA_HOME/bin:\$PATH
EOF
    
    chmod +x /etc/profile.d/tomcat.sh
    source /etc/profile.d/tomcat.sh
    
    # Create systemd service
    create_tomcat_service
    
    # Cleanup
    rm -f apache-tomcat-${TOMCAT_VERSION}.tar.gz
    
    print_success "Tomcat $TOMCAT_VERSION installed successfully"
}

# Function to create Tomcat systemd service
create_tomcat_service() {
    print_info "Creating Tomcat systemd service..."
    
    cat > /etc/systemd/system/tomcat.service << EOF
[Unit]
Description=Apache Tomcat 9
After=network.target

[Service]
Type=forking

User=$TOMCAT_USER
Group=$TOMCAT_GROUP

Environment="JAVA_HOME=$JAVA_HOME"
Environment="CATALINA_HOME=$INSTALL_DIR/tomcat"
Environment="CATALINA_BASE=$INSTALL_DIR/tomcat"
Environment="CATALINA_PID=$INSTALL_DIR/tomcat/temp/tomcat.pid"
Environment="CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC"

ExecStart=$INSTALL_DIR/tomcat/bin/startup.sh
ExecStop=$INSTALL_DIR/tomcat/bin/shutdown.sh

Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
    
    # Reload systemd
    systemctl daemon-reload
    
    # Enable Tomcat service
    systemctl enable tomcat
    
    print_success "Tomcat systemd service created and enabled"
}

# Function to configure firewall
configure_firewall() {
    print_info "Configuring firewall..."
    
    if command -v firewall-cmd &> /dev/null; then
        # Check if firewalld is running
        if systemctl is-active --quiet firewalld; then
            firewall-cmd --permanent --add-port=8080/tcp
            firewall-cmd --reload
            print_success "Firewall configured (port 8080 opened)"
        else
            print_warning "Firewalld is not running"
        fi
    else
        print_warning "Firewalld not found, skipping firewall configuration"
    fi
}

# Function to install additional tools
install_tools() {
    print_info "Installing additional tools..."
    
    dnf install -y wget curl tar gzip nc git
    
    print_success "Additional tools installed"
}

# Function to display summary
display_summary() {
    echo ""
    echo "========================================="
    echo "Installation Summary"
    echo "========================================="
    echo ""
    
    # Java
    if command -v java &> /dev/null; then
        JAVA_VER=$(java -version 2>&1 | head -n 1)
        echo -e "${GREEN}✓${NC} Java: $JAVA_VER"
        echo "  JAVA_HOME: $JAVA_HOME"
    else
        echo -e "${RED}✗${NC} Java: Not installed"
    fi
    
    # Maven
    if command -v mvn &> /dev/null; then
        MVN_VER=$(mvn -version | head -n 1)
        echo -e "${GREEN}✓${NC} Maven: $MVN_VER"
        echo "  M2_HOME: $M2_HOME"
    else
        echo -e "${RED}✗${NC} Maven: Not installed"
    fi
    
    # Tomcat
    if [ -d "$INSTALL_DIR/tomcat" ]; then
        TOMCAT_VER=$(cat $INSTALL_DIR/tomcat/RELEASE-NOTES | grep "Apache Tomcat Version" | head -n 1)
        echo -e "${GREEN}✓${NC} Tomcat: $TOMCAT_VER"
        echo "  CATALINA_HOME: $INSTALL_DIR/tomcat"
        echo "  Service: systemctl start|stop|status tomcat"
    else
        echo -e "${RED}✗${NC} Tomcat: Not installed"
    fi
    
    echo ""
    echo "========================================="
    echo "Next Steps"
    echo "========================================="
    echo ""
    echo "1. Reload environment variables:"
    echo "   source /etc/profile"
    echo ""
    echo "2. Start Tomcat:"
    echo "   systemctl start tomcat"
    echo "   systemctl status tomcat"
    echo ""
    echo "3. Verify Tomcat is running:"
    echo "   curl http://localhost:8080"
    echo ""
    echo "4. Build and deploy your application:"
    echo "   cd /path/to/spec-kafka"
    echo "   mvn clean install"
    echo "   cp spec-producer-webapp/target/spec-producer.war $INSTALL_DIR/tomcat/webapps/"
    echo "   cp spec-consumer-webapp/target/spec-consumer.war $INSTALL_DIR/tomcat/webapps/"
    echo ""
    echo "5. Check deployment:"
    echo "   curl http://localhost:8080/spec-producer/status"
    echo "   curl http://localhost:8080/spec-consumer/status"
    echo ""
}

# Main installation flow
main() {
    echo "========================================="
    echo "Rocky Linux Dependency Installer"
    echo "========================================="
    echo ""
    echo "This script will install:"
    echo "  - OpenJDK $JDK_VERSION"
    echo "  - Apache Maven $MAVEN_VERSION"
    echo "  - Apache Tomcat $TOMCAT_VERSION"
    echo ""
    echo "Installation directory: $INSTALL_DIR"
    echo ""
    
    read -p "Do you want to continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Installation cancelled"
        exit 0
    fi
    
    # Check prerequisites
    check_root
    check_os
    
    # Update system
    print_info "Updating system packages..."
    dnf update -y
    
    # Install tools
    install_tools
    
    # Install components
    install_jdk
    install_maven
    install_tomcat
    
    # Configure firewall
    configure_firewall
    
    # Display summary
    display_summary
    
    print_success "Installation completed successfully!"
}

# Run main function
main

