# Homebrew Tomcat on macOS Guide

## Homebrew Tomcat Locations

When you install Tomcat via Homebrew on macOS, the directory structure is different:

### Apple Silicon (M1/M2/M3)
```bash
Tomcat Home: /opt/homebrew/opt/tomcat/libexec
Webapps: /opt/homebrew/opt/tomcat/libexec/webapps
Config: /opt/homebrew/etc/tomcat
Logs: /opt/homebrew/var/log/tomcat
```

### Intel Mac
```bash
Tomcat Home: /usr/local/opt/tomcat/libexec
Webapps: /usr/local/opt/tomcat/libexec/webapps
Config: /usr/local/etc/tomcat
Logs: /usr/local/var/log/tomcat
```

## Installation

```bash
# Install Tomcat
brew install tomcat

# Verify installation
brew list tomcat
```

## Managing Tomcat with Homebrew

### Start Tomcat
```bash
brew services start tomcat
```

### Stop Tomcat
```bash
brew services stop tomcat
```

### Restart Tomcat
```bash
brew services restart tomcat
```

### Check Status
```bash
brew services list | grep tomcat
```

### View Logs
```bash
# Apple Silicon
tail -f /opt/homebrew/var/log/tomcat/catalina.out

# Intel Mac
tail -f /usr/local/var/log/tomcat/catalina.out
```

## Deployment Scripts (Auto-Detection)

The deployment scripts have been updated to automatically detect Homebrew Tomcat:

### deploy-native.sh
- ✅ Auto-detects Homebrew Tomcat location
- ✅ Uses `brew services` to start/stop
- ✅ Deploys to correct webapps directory

### start-services.sh
- ✅ Auto-detects Homebrew Tomcat
- ✅ Uses `brew services start tomcat`

### stop-services.sh
- ✅ Auto-detects Homebrew Tomcat
- ✅ Uses `brew services stop tomcat`

## Manual Deployment (Homebrew)

If you need to deploy manually:

### Apple Silicon (M1/M2/M3)
```bash
# Build
mvn clean install

# Stop Tomcat
brew services stop tomcat

# Clean old deployments
rm -rf /opt/homebrew/opt/tomcat/libexec/webapps/spec-producer*
rm -rf /opt/homebrew/opt/tomcat/libexec/webapps/spec-consumer*

# Deploy WARs
cp spec-producer-webapp/target/spec-producer.war /opt/homebrew/opt/tomcat/libexec/webapps/
cp spec-consumer-webapp/target/spec-consumer.war /opt/homebrew/opt/tomcat/libexec/webapps/

# Start Tomcat
brew services start tomcat

# Wait for deployment
sleep 20

# View logs
tail -f /opt/homebrew/var/log/tomcat/catalina.out
```

### Intel Mac
```bash
# Build
mvn clean install

# Stop Tomcat
brew services stop tomcat

# Clean old deployments
rm -rf /usr/local/opt/tomcat/libexec/webapps/spec-producer*
rm -rf /usr/local/opt/tomcat/libexec/webapps/spec-consumer*

# Deploy WARs
cp spec-producer-webapp/target/spec-producer.war /usr/local/opt/tomcat/libexec/webapps/
cp spec-consumer-webapp/target/spec-consumer.war /usr/local/opt/tomcat/libexec/webapps/

# Start Tomcat
brew services start tomcat

# Wait for deployment
sleep 20

# View logs
tail -f /usr/local/var/log/tomcat/catalina.out
```

## Using the Automated Script

The easiest way is to use the automated script (already updated for Homebrew):

```bash
./deploy-native.sh
```

The script will:
1. ✅ Detect Homebrew Tomcat automatically
2. ✅ Use correct paths for your Mac (Apple Silicon or Intel)
3. ✅ Use `brew services` commands
4. ✅ Deploy to correct webapps directory

## Environment Variables (Optional)

You don't need to set TOMCAT_HOME for Homebrew Tomcat, but if you want to:

### Apple Silicon
```bash
export TOMCAT_HOME=/opt/homebrew/opt/tomcat/libexec
```

### Intel Mac
```bash
export TOMCAT_HOME=/usr/local/opt/tomcat/libexec
```

Add to `~/.zshrc`:
```bash
# Tomcat (Homebrew)
if [ -d "/opt/homebrew/opt/tomcat" ]; then
    export TOMCAT_HOME=/opt/homebrew/opt/tomcat/libexec
elif [ -d "/usr/local/opt/tomcat" ]; then
    export TOMCAT_HOME=/usr/local/opt/tomcat/libexec
fi
```

## Configuration Files

### Apple Silicon
```bash
# Server configuration
/opt/homebrew/etc/tomcat/server.xml

# Tomcat users (for manager app)
/opt/homebrew/etc/tomcat/tomcat-users.xml

# Web configuration
/opt/homebrew/etc/tomcat/web.xml
```

### Intel Mac
```bash
# Server configuration
/usr/local/etc/tomcat/server.xml

# Tomcat users (for manager app)
/usr/local/etc/tomcat/tomcat-users.xml

# Web configuration
/usr/local/etc/tomcat/web.xml
```

## Changing Tomcat Port

Edit server.xml:

```bash
# Apple Silicon
vi /opt/homebrew/etc/tomcat/server.xml

# Intel Mac
vi /usr/local/etc/tomcat/server.xml
```

Find and change:
```xml
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
```

Restart Tomcat:
```bash
brew services restart tomcat
```

## Troubleshooting

### Tomcat Won't Start

```bash
# Check if already running
brew services list | grep tomcat

# Check logs for errors
tail -50 /opt/homebrew/var/log/tomcat/catalina.out  # Apple Silicon
tail -50 /usr/local/var/log/tomcat/catalina.out     # Intel Mac

# Try restarting
brew services restart tomcat
```

### Port 8080 Already in Use

```bash
# Find what's using port 8080
lsof -i :8080

# Kill the process or change Tomcat port (see above)
```

### WARs Not Deploying

```bash
# Check webapps directory permissions
ls -la /opt/homebrew/opt/tomcat/libexec/webapps/  # Apple Silicon
ls -la /usr/local/opt/tomcat/libexec/webapps/     # Intel Mac

# Check if WARs were copied
ls -lh /opt/homebrew/opt/tomcat/libexec/webapps/*.war

# Check Tomcat is running
brew services list | grep tomcat

# Check logs
tail -f /opt/homebrew/var/log/tomcat/catalina.out
```

### Applications Not Accessible

```bash
# Wait longer (deployment can take 30-60 seconds)
sleep 30

# Check if directories were created
ls -la /opt/homebrew/opt/tomcat/libexec/webapps/ | grep spec-

# Test endpoints
curl http://localhost:8080/spec-producer/status
curl http://localhost:8080/spec-consumer/status
```

## Quick Reference

### Deploy
```bash
./deploy-native.sh
```

### Start Tomcat
```bash
brew services start tomcat
```

### Stop Tomcat
```bash
brew services stop tomcat
```

### View Logs (Apple Silicon)
```bash
tail -f /opt/homebrew/var/log/tomcat/catalina.out
```

### View Logs (Intel Mac)
```bash
tail -f /usr/local/var/log/tomcat/catalina.out
```

### Check Status
```bash
brew services list | grep tomcat
curl http://localhost:8080/spec-producer/status
```

## Summary

✅ **Scripts Updated:** All deployment scripts now auto-detect Homebrew Tomcat

✅ **No Manual Configuration Needed:** Just run `./deploy-native.sh`

✅ **Homebrew Commands Work:** Use `brew services start/stop/restart tomcat`

✅ **Logs in Standard Location:** Check `/opt/homebrew/var/log/tomcat/` (Apple Silicon) or `/usr/local/var/log/tomcat/` (Intel)

The deployment process is now seamless on macOS with Homebrew Tomcat! 🎉

