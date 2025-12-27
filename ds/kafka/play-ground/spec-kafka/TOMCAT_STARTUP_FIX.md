# Tomcat Startup Issue Fix

## Problem

When trying to start Tomcat with `brew services start tomcat@9`, you see:

```
Bootstrap failed: 5: Input/output error
Error: Failure while executing; `/bin/launchctl bootstrap gui/501 ...` exited with 5.
```

## Quick Fix

### Option 1: Clean and Restart (Recommended)

```bash
# 1. Stop any existing Tomcat processes
brew services stop tomcat@9

# 2. Remove the plist file
rm ~/Library/LaunchAgents/homebrew.mxcl.tomcat@9.plist

# 3. Unload any existing service
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.tomcat@9.plist 2>/dev/null || true

# 4. Kill any running Tomcat processes
pkill -9 -f tomcat

# 5. Restart the service
brew services restart tomcat@9
```

### Option 2: Start Tomcat Manually (Simplest)

Instead of using `brew services`, start Tomcat directly:

```bash
# Start Tomcat manually
/opt/homebrew/opt/tomcat@9/bin/catalina run &

# Or in the background
/opt/homebrew/opt/tomcat@9/bin/catalina start
```

**This is actually simpler and works reliably!**

### Option 3: Fix Permissions

```bash
# Fix permissions on the plist file
chmod 644 ~/Library/LaunchAgents/homebrew.mxcl.tomcat@9.plist

# Fix Tomcat directory permissions
sudo chown -R $(whoami) /opt/homebrew/opt/tomcat@9

# Try again
brew services restart tomcat@9
```

## Recommended Approach: Manual Startup

For development, it's often easier to start Tomcat manually:

### Start Tomcat Manually

```bash
# Apple Silicon
/opt/homebrew/opt/tomcat@9/bin/catalina start

# Intel Mac
/usr/local/opt/tomcat@9/bin/catalina start
```

### Stop Tomcat Manually

```bash
# Apple Silicon
/opt/homebrew/opt/tomcat@9/bin/catalina stop

# Intel Mac
/usr/local/opt/tomcat@9/bin/catalina stop
```

### Check if Tomcat is Running

```bash
# Check process
ps aux | grep tomcat

# Check port
lsof -i :8080

# Test endpoint
curl http://localhost:8080
```

### View Logs

```bash
# Apple Silicon
tail -f /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out

# Intel Mac
tail -f /usr/local/opt/tomcat@9/libexec/logs/catalina.out
```

## Update Deployment Script for Manual Start

If you prefer manual startup, you can modify the deployment script to use manual commands instead of `brew services`.

Create a file `deploy-manual.sh`:

```bash
#!/bin/bash

set -e

TOMCAT_HOME="/opt/homebrew/opt/tomcat@9/libexec"
PROJECT_DIR=$(pwd)

echo "========================================="
echo "Spec Kafka - Manual Tomcat Deployment"
echo "========================================="

# Build
echo "Building project..."
mvn clean install -DskipTests
echo "✓ Build complete"

# Stop Tomcat
echo ""
echo "Stopping Tomcat..."
$TOMCAT_HOME/bin/catalina stop 2>/dev/null || true
sleep 5
echo "✓ Tomcat stopped"

# Clean old deployments
echo ""
echo "Cleaning old deployments..."
rm -rf $TOMCAT_HOME/webapps/spec-producer*
rm -rf $TOMCAT_HOME/webapps/spec-consumer*
echo "✓ Old deployments removed"

# Deploy new WARs
echo ""
echo "Deploying new WARs..."
cp spec-producer-webapp/target/spec-producer.war $TOMCAT_HOME/webapps/
cp spec-consumer-webapp/target/spec-consumer.war $TOMCAT_HOME/webapps/
echo "✓ WARs deployed"

# Start Tomcat
echo ""
echo "Starting Tomcat..."
$TOMCAT_HOME/bin/catalina start
echo "✓ Tomcat started"

# Wait for deployment
echo ""
echo "Waiting for applications to deploy (20 seconds)..."
sleep 20

# Test endpoints
echo ""
echo "Testing endpoints..."
if curl -s http://localhost:8080/spec-producer/status > /dev/null; then
    echo "✓ Producer is accessible"
else
    echo "✗ Producer is not accessible yet"
fi

if curl -s http://localhost:8080/spec-consumer/status > /dev/null; then
    echo "✓ Consumer is accessible"
else
    echo "✗ Consumer is not accessible yet"
fi

echo ""
echo "========================================="
echo "Deployment Complete!"
echo "========================================="
echo ""
echo "View logs:"
echo "  tail -f $TOMCAT_HOME/logs/catalina.out"
echo ""
```

Make it executable:

```bash
chmod +x deploy-manual.sh
```

## Alternative: Use Docker for Tomcat

If brew services continues to have issues, use Docker:

```bash
# Stop brew Tomcat
brew services stop tomcat@9

# Run Tomcat 9 in Docker
docker run -d \
  --name tomcat9 \
  -p 8080:8080 \
  -v $(pwd)/spec-producer-webapp/target/spec-producer.war:/usr/local/tomcat/webapps/spec-producer.war \
  -v $(pwd)/spec-consumer-webapp/target/spec-consumer.war:/usr/local/tomcat/webapps/spec-consumer.war \
  tomcat:9-jdk11

# View logs
docker logs -f tomcat9

# Stop
docker stop tomcat9
docker rm tomcat9
```

## Troubleshooting Commands

```bash
# Check if Tomcat is already running
ps aux | grep tomcat
lsof -i :8080

# Kill any existing Tomcat processes
pkill -9 -f tomcat

# Check launchctl services
launchctl list | grep tomcat

# Remove all Tomcat services
launchctl remove homebrew.mxcl.tomcat@9 2>/dev/null || true

# Check plist file
ls -la ~/Library/LaunchAgents/homebrew.mxcl.tomcat@9.plist

# Validate plist
plutil ~/Library/LaunchAgents/homebrew.mxcl.tomcat@9.plist
```

## Summary

**Recommended Solution:** Use manual startup instead of brew services:

```bash
# Start Tomcat
/opt/homebrew/opt/tomcat@9/bin/catalina start

# Deploy your app
mvn clean install
cp spec-producer-webapp/target/spec-producer.war /opt/homebrew/opt/tomcat@9/libexec/webapps/
cp spec-consumer-webapp/target/spec-consumer.war /opt/homebrew/opt/tomcat@9/libexec/webapps/

# View logs
tail -f /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out

# Stop Tomcat
/opt/homebrew/opt/tomcat@9/bin/catalina stop
```

This is simpler, more reliable, and gives you better control! 🎉

