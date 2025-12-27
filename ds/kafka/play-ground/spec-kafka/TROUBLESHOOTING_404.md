# Troubleshooting 404 Errors

## Problem

When accessing the endpoints, you get a 404 error:
```bash
curl http://localhost:8080/spec-producer/produce
# Returns 404
```

## Quick Diagnostic Steps

### 1. Check if Tomcat is Running

```bash
# Check process
ps aux | grep tomcat

# Check port
lsof -i :8080

# Test Tomcat root
curl http://localhost:8080
```

**Expected:** Should see Tomcat process and port 8080 in use.

### 2. Check if WARs are Deployed

```bash
# Check webapps directory
ls -la /opt/homebrew/opt/tomcat@9/libexec/webapps/

# Look for:
# - spec-producer.war
# - spec-producer/ (directory)
# - spec-consumer.war
# - spec-consumer/ (directory)
```

**Expected:** Both WAR files AND directories should exist.

### 3. Check Tomcat Logs

```bash
# View logs
tail -50 /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out

# Look for errors like:
# - ClassNotFoundException
# - NoClassDefFoundError
# - Deployment failed
# - Context initialization failed
```

## Common Causes and Fixes

### Cause 1: Applications Not Deployed Yet

**Wait longer** - Deployment can take 30-60 seconds:

```bash
# Wait and check
sleep 30
curl http://localhost:8080/spec-producer/status
```

### Cause 2: Deployment Failed

Check logs for errors:

```bash
tail -100 /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out | grep -i error
```

**Common errors:**
- `javax.servlet` not found → Need Tomcat 9 (see TOMCAT_VERSION_FIX.md)
- `javax.annotation` not found → Already fixed in POMs
- Spring context errors → Check applicationContext.xml

### Cause 3: Wrong Context Path

The applications are deployed at:
- `/spec-producer` (NOT `/spec-producer-webapp`)
- `/spec-consumer` (NOT `/spec-consumer-webapp`)

**Correct URLs:**
```bash
curl http://localhost:8080/spec-producer/status
curl http://localhost:8080/spec-consumer/status
```

### Cause 4: Tomcat Not Running

Start Tomcat:

```bash
/opt/homebrew/opt/tomcat@9/bin/catalina start

# Wait for startup
sleep 10

# Test
curl http://localhost:8080
```

### Cause 5: Port 8080 in Use by Something Else

```bash
# Check what's on port 8080
lsof -i :8080

# If it's not Tomcat, kill it or change Tomcat port
```

## Step-by-Step Fix

### Step 1: Stop Everything

```bash
# Stop Tomcat
/opt/homebrew/opt/tomcat@9/bin/catalina stop
sleep 5

# Kill any remaining processes
pkill -9 -f tomcat
```

### Step 2: Clean Deployment

```bash
# Remove old deployments
rm -rf /opt/homebrew/opt/tomcat@9/libexec/webapps/spec-*

# Clean build
cd /Users/mcheedhe/Data/techdocs/ds/kafka/play-ground/spec-kafka
mvn clean
```

### Step 3: Rebuild

```bash
mvn clean install -DskipTests
```

**Check for build errors!** If build fails, fix errors first.

### Step 4: Deploy

```bash
./deploy-manual.sh
```

### Step 5: Wait and Monitor

```bash
# Watch logs in real-time
tail -f /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out

# Wait for these messages:
# - "Deployment of web application directory [.../spec-producer] has finished"
# - "Deployment of web application directory [.../spec-consumer] has finished"
```

**Wait at least 30 seconds** after seeing deployment messages.

### Step 6: Test

```bash
# Test root
curl http://localhost:8080

# Test applications
curl http://localhost:8080/spec-producer/status
curl http://localhost:8080/spec-consumer/status
```

## Verification Checklist

Run these commands to verify everything:

```bash
# 1. Tomcat is running
ps aux | grep tomcat | grep -v grep
# Should show: java ... org.apache.catalina.startup.Bootstrap start

# 2. Port 8080 is open
lsof -i :8080
# Should show: java ... (LISTEN)

# 3. WAR files exist
ls -lh /opt/homebrew/opt/tomcat@9/libexec/webapps/*.war
# Should show: spec-producer.war and spec-consumer.war

# 4. Directories exist (deployed)
ls -ld /opt/homebrew/opt/tomcat@9/libexec/webapps/spec-*
# Should show: spec-producer/ and spec-consumer/ directories

# 5. No errors in logs
tail -50 /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out | grep -i "severe\|error"
# Should show: minimal or no errors

# 6. Test endpoints
curl -v http://localhost:8080/spec-producer/status
# Should return: 200 OK with JSON
```

## If Still Getting 404

### Check Exact Deployment Status

```bash
# List all deployed apps
ls -la /opt/homebrew/opt/tomcat@9/libexec/webapps/

# Check if directories have content
ls -la /opt/homebrew/opt/tomcat@9/libexec/webapps/spec-producer/
ls -la /opt/homebrew/opt/tomcat@9/libexec/webapps/spec-consumer/
```

### Check Tomcat Manager (if enabled)

```bash
# Access manager
open http://localhost:8080/manager/html

# Or via curl
curl http://localhost:8080/manager/text/list
```

### Manual Deployment Test

```bash
# Stop Tomcat
/opt/homebrew/opt/tomcat@9/bin/catalina stop

# Remove everything
rm -rf /opt/homebrew/opt/tomcat@9/libexec/webapps/spec-*

# Copy just one WAR
cp spec-producer-webapp/target/spec-producer.war /opt/homebrew/opt/tomcat@9/libexec/webapps/

# Start Tomcat
/opt/homebrew/opt/tomcat@9/bin/catalina start

# Watch logs
tail -f /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out

# Wait 30 seconds, then test
sleep 30
curl http://localhost:8080/spec-producer/status
```

## Common Log Errors and Solutions

### Error: "java.lang.NoClassDefFoundError: javax/servlet/ServletContextListener"

**Solution:** You have Tomcat 10+, need Tomcat 9:
```bash
brew uninstall tomcat
brew install tomcat@9
./deploy-manual.sh
```

### Error: "package javax.annotation does not exist"

**Solution:** Already fixed in POMs, just rebuild:
```bash
mvn clean install
./deploy-manual.sh
```

### Error: "Bean property 'orderProducerService' is not writable"

**Solution:** Already fixed in applicationContext.xml, just rebuild:
```bash
mvn clean install
./deploy-manual.sh
```

### Error: "Failed to start component [StandardEngine[Catalina].StandardHost[localhost].StandardContext[/spec-producer]]"

**Check logs for specific cause:**
```bash
grep -A 20 "Failed to start component" /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out
```

## Quick Test Script

Save as `test-deployment.sh`:

```bash
#!/bin/bash

echo "Testing Deployment..."
echo ""

echo "1. Checking Tomcat process..."
if ps aux | grep -v grep | grep tomcat > /dev/null; then
    echo "✓ Tomcat is running"
else
    echo "✗ Tomcat is NOT running"
    exit 1
fi

echo ""
echo "2. Checking port 8080..."
if lsof -i :8080 > /dev/null 2>&1; then
    echo "✓ Port 8080 is in use"
else
    echo "✗ Port 8080 is NOT in use"
    exit 1
fi

echo ""
echo "3. Checking WAR files..."
if [ -f "/opt/homebrew/opt/tomcat@9/libexec/webapps/spec-producer.war" ]; then
    echo "✓ spec-producer.war exists"
else
    echo "✗ spec-producer.war NOT found"
fi

if [ -f "/opt/homebrew/opt/tomcat@9/libexec/webapps/spec-consumer.war" ]; then
    echo "✓ spec-consumer.war exists"
else
    echo "✗ spec-consumer.war NOT found"
fi

echo ""
echo "4. Checking deployed directories..."
if [ -d "/opt/homebrew/opt/tomcat@9/libexec/webapps/spec-producer" ]; then
    echo "✓ spec-producer deployed"
else
    echo "✗ spec-producer NOT deployed"
fi

if [ -d "/opt/homebrew/opt/tomcat@9/libexec/webapps/spec-consumer" ]; then
    echo "✓ spec-consumer deployed"
else
    echo "✗ spec-consumer NOT deployed"
fi

echo ""
echo "5. Testing endpoints..."
if curl -s http://localhost:8080/spec-producer/status > /dev/null 2>&1; then
    echo "✓ Producer endpoint accessible"
else
    echo "✗ Producer endpoint NOT accessible (404)"
fi

if curl -s http://localhost:8080/spec-consumer/status > /dev/null 2>&1; then
    echo "✓ Consumer endpoint accessible"
else
    echo "✗ Consumer endpoint NOT accessible (404)"
fi

echo ""
echo "6. Checking for errors in logs..."
ERROR_COUNT=$(tail -100 /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out | grep -i "SEVERE\|Exception" | wc -l)
if [ "$ERROR_COUNT" -gt 0 ]; then
    echo "⚠️  Found $ERROR_COUNT errors in logs"
    echo "View with: tail -50 /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out"
else
    echo "✓ No severe errors in recent logs"
fi

echo ""
echo "Done!"
```

Make it executable and run:
```bash
chmod +x test-deployment.sh
./test-deployment.sh
```

## Summary

**Most common cause:** Applications haven't finished deploying yet.

**Solution:** Wait 30-60 seconds after deployment, then test.

**Quick fix:**
```bash
# Redeploy
./deploy-manual.sh

# Wait
sleep 30

# Test
curl http://localhost:8080/spec-producer/status
curl http://localhost:8080/spec-consumer/status

# If still 404, check logs
tail -50 /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out
```

