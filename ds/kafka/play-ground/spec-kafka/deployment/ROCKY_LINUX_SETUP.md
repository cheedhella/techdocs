# Rocky Linux Setup Guide

Complete guide for setting up the Spec Kafka application on Rocky Linux.

## Quick Start

### Step 1: Install Dependencies

```bash
# Download or copy the script to your Rocky Linux server
cd /path/to/spec-kafka/deployment

# Run the installation script as root
sudo ./install-dependencies-rocky.sh
```

The script will install:
- ✅ OpenJDK 17
- ✅ Apache Maven 3.9.5
- ✅ Apache Tomcat 9.0.84
- ✅ Additional tools (wget, curl, git, nc)
- ✅ Systemd service for Tomcat
- ✅ Firewall configuration (port 8080)

### Step 2: Verify Installation

```bash
# Reload environment
source /etc/profile

# Check Java
java -version

# Check Maven
mvn -version

# Check Tomcat
systemctl status tomcat
```

### Step 3: Start Tomcat

```bash
# Start Tomcat service
sudo systemctl start tomcat

# Enable auto-start on boot
sudo systemctl enable tomcat

# Check status
sudo systemctl status tomcat

# Test Tomcat
curl http://localhost:8080
```

### Step 4: Build and Deploy Application

```bash
# Navigate to project directory
cd /path/to/spec-kafka

# Build the application
mvn clean install

# Deploy WAR files
sudo cp spec-producer-webapp/target/spec-producer.war /opt/tomcat/webapps/
sudo cp spec-consumer-webapp/target/spec-consumer.war /opt/tomcat/webapps/

# Wait for deployment (30 seconds)
sleep 30

# Test endpoints
curl http://localhost:8080/spec-producer/status
curl http://localhost:8080/spec-consumer/status
```

## Installation Script Details

### What It Does

1. **System Check**
   - Verifies Rocky Linux
   - Checks for root privileges
   - Updates system packages

2. **JDK Installation**
   - Installs OpenJDK 17
   - Sets JAVA_HOME environment variable
   - Adds to system PATH

3. **Maven Installation**
   - Downloads Apache Maven 3.9.5
   - Installs to `/opt/maven`
   - Sets M2_HOME and MAVEN_HOME
   - Creates symlink to `/usr/local/bin/mvn`

4. **Tomcat Installation**
   - Creates `tomcat` system user
   - Downloads Apache Tomcat 9.0.84
   - Installs to `/opt/tomcat`
   - Creates systemd service
   - Configures auto-start

5. **Firewall Configuration**
   - Opens port 8080 for HTTP
   - Reloads firewall rules

### Installation Locations

```
/opt/maven/                    - Maven installation
/opt/tomcat/                   - Tomcat installation (symlink)
/opt/apache-tomcat-9.0.84/     - Tomcat actual directory
/etc/profile.d/java.sh         - Java environment
/etc/profile.d/maven.sh        - Maven environment
/etc/profile.d/tomcat.sh       - Tomcat environment
/etc/systemd/system/tomcat.service - Tomcat service
```

### Environment Variables

After installation, these are set:

```bash
JAVA_HOME=/usr/lib/jvm/java-17-openjdk-...
M2_HOME=/opt/maven
MAVEN_HOME=/opt/maven
CATALINA_HOME=/opt/tomcat
```

## Tomcat Management

### Systemd Commands

```bash
# Start Tomcat
sudo systemctl start tomcat

# Stop Tomcat
sudo systemctl stop tomcat

# Restart Tomcat
sudo systemctl restart tomcat

# Check status
sudo systemctl status tomcat

# Enable auto-start
sudo systemctl enable tomcat

# Disable auto-start
sudo systemctl disable tomcat

# View logs
sudo journalctl -u tomcat -f
```

### Manual Commands

```bash
# Start Tomcat manually
sudo -u tomcat /opt/tomcat/bin/startup.sh

# Stop Tomcat manually
sudo -u tomcat /opt/tomcat/bin/shutdown.sh

# View logs
tail -f /opt/tomcat/logs/catalina.out
```

## Deployment Workflow

### Initial Deployment

```bash
# 1. Install dependencies
sudo ./install-dependencies-rocky.sh

# 2. Start Tomcat
sudo systemctl start tomcat

# 3. Build application
cd /path/to/spec-kafka
mvn clean install

# 4. Deploy
sudo cp spec-producer-webapp/target/spec-producer.war /opt/tomcat/webapps/
sudo cp spec-consumer-webapp/target/spec-consumer.war /opt/tomcat/webapps/

# 5. Wait and test
sleep 30
curl http://localhost:8080/spec-producer/status
```

### Update Deployment

```bash
# 1. Stop Tomcat
sudo systemctl stop tomcat

# 2. Remove old deployments
sudo rm -rf /opt/tomcat/webapps/spec-producer*
sudo rm -rf /opt/tomcat/webapps/spec-consumer*

# 3. Rebuild
cd /path/to/spec-kafka
mvn clean install

# 4. Deploy new WARs
sudo cp spec-producer-webapp/target/spec-producer.war /opt/tomcat/webapps/
sudo cp spec-consumer-webapp/target/spec-consumer.war /opt/tomcat/webapps/

# 5. Start Tomcat
sudo systemctl start tomcat

# 6. Wait and test
sleep 30
curl http://localhost:8080/spec-producer/status
```

## Firewall Configuration

### Check Firewall Status

```bash
sudo firewall-cmd --state
sudo firewall-cmd --list-all
```

### Manual Firewall Configuration

```bash
# Open port 8080
sudo firewall-cmd --permanent --add-port=8080/tcp

# Reload firewall
sudo firewall-cmd --reload

# Verify
sudo firewall-cmd --list-ports
```

### Disable Firewall (Development Only)

```bash
# Stop firewall
sudo systemctl stop firewalld

# Disable firewall
sudo systemctl disable firewalld
```

## SELinux Configuration

If you encounter permission issues, you may need to configure SELinux:

### Check SELinux Status

```bash
getenforce
```

### Temporary Disable (Testing)

```bash
sudo setenforce 0
```

### Permanent Configuration

```bash
# Allow Tomcat to bind to port 8080
sudo semanage port -a -t http_port_t -p tcp 8080

# Allow Tomcat to read/write files
sudo chcon -R -t tomcat_var_lib_t /opt/tomcat/webapps/
```

## Troubleshooting

### Java Not Found

```bash
# Check Java installation
rpm -qa | grep java

# Reinstall if needed
sudo dnf install -y java-17-openjdk java-17-openjdk-devel

# Set JAVA_HOME manually
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
```

### Maven Not Found

```bash
# Check if Maven is in PATH
which mvn

# Add to PATH if needed
export PATH=/opt/maven/bin:$PATH

# Or use full path
/opt/maven/bin/mvn -version
```

### Tomcat Won't Start

```bash
# Check logs
sudo journalctl -u tomcat -n 50

# Check Tomcat logs
sudo tail -50 /opt/tomcat/logs/catalina.out

# Check if port 8080 is in use
sudo lsof -i :8080
sudo netstat -tulpn | grep 8080

# Check permissions
ls -la /opt/tomcat/
```

### Port 8080 Not Accessible

```bash
# Check if Tomcat is running
sudo systemctl status tomcat

# Check if port is open
sudo netstat -tulpn | grep 8080

# Check firewall
sudo firewall-cmd --list-ports

# Test locally
curl http://localhost:8080

# Test from another machine
curl http://<server-ip>:8080
```

### Application Not Deploying

```bash
# Check webapps directory
ls -la /opt/tomcat/webapps/

# Check ownership
sudo chown -R tomcat:tomcat /opt/tomcat/webapps/

# Check logs for errors
sudo tail -100 /opt/tomcat/logs/catalina.out | grep -i error

# Redeploy manually
sudo systemctl stop tomcat
sudo rm -rf /opt/tomcat/webapps/spec-*
sudo cp *.war /opt/tomcat/webapps/
sudo chown tomcat:tomcat /opt/tomcat/webapps/*.war
sudo systemctl start tomcat
```

## Security Considerations

### Tomcat User

The installation creates a dedicated `tomcat` user with:
- No login shell (`/bin/false`)
- Home directory: `/opt/tomcat`
- Runs Tomcat process

### File Permissions

```bash
# Verify permissions
ls -la /opt/tomcat/

# Fix if needed
sudo chown -R tomcat:tomcat /opt/tomcat/
sudo chmod -R 755 /opt/tomcat/
```

### Firewall

Only port 8080 is opened by default. For production:

```bash
# Consider using a reverse proxy (nginx/apache)
# And only expose 80/443 externally
```

## Production Recommendations

### 1. Use Reverse Proxy

```bash
# Install nginx
sudo dnf install -y nginx

# Configure as reverse proxy
# Edit /etc/nginx/nginx.conf
```

### 2. Enable HTTPS

```bash
# Install certbot
sudo dnf install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com
```

### 3. Tune JVM Settings

Edit `/etc/systemd/system/tomcat.service`:

```ini
Environment="CATALINA_OPTS=-Xms2G -Xmx4G -server -XX:+UseG1GC"
```

Then reload:

```bash
sudo systemctl daemon-reload
sudo systemctl restart tomcat
```

### 4. Enable Monitoring

```bash
# Install monitoring tools
sudo dnf install -y htop iotop

# Monitor Tomcat
htop -p $(pgrep -f tomcat)
```

## Uninstallation

If you need to remove the installation:

```bash
# Stop and disable Tomcat
sudo systemctl stop tomcat
sudo systemctl disable tomcat

# Remove installations
sudo rm -rf /opt/maven
sudo rm -rf /opt/tomcat
sudo rm -rf /opt/apache-tomcat-*

# Remove systemd service
sudo rm /etc/systemd/system/tomcat.service
sudo systemctl daemon-reload

# Remove environment files
sudo rm /etc/profile.d/java.sh
sudo rm /etc/profile.d/maven.sh
sudo rm /etc/profile.d/tomcat.sh

# Remove Tomcat user
sudo userdel -r tomcat

# Remove Java (optional)
sudo dnf remove -y java-17-openjdk*
```

## Summary

**Quick Setup:**
```bash
sudo ./install-dependencies-rocky.sh
sudo systemctl start tomcat
mvn clean install
sudo cp *-webapp/target/*.war /opt/tomcat/webapps/
```

**Manage Tomcat:**
```bash
sudo systemctl start|stop|restart|status tomcat
```

**View Logs:**
```bash
sudo tail -f /opt/tomcat/logs/catalina.out
```

**Test Application:**
```bash
curl http://localhost:8080/spec-producer/status
curl http://localhost:8080/spec-consumer/status
```

That's it! Your Rocky Linux server is now ready to run the Spec Kafka application! 🎉

