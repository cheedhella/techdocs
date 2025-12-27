# macOS Deployment Guide (Homebrew)

## ✅ Quick Start for macOS

Your deployment scripts are now fully compatible with Homebrew Tomcat on macOS!

### 1. Install Prerequisites

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java
brew install openjdk@11

# Install Maven
brew install maven

# Install Tomcat
brew install tomcat
```

### 2. Start Tomcat

```bash
brew services start tomcat
```

### 3. Deploy Application

```bash
# One command - auto-detects Homebrew Tomcat!
./deploy-native.sh
```

That's it! The script automatically:
- ✅ Detects Homebrew Tomcat location
- ✅ Builds the application
- ✅ Stops Tomcat using `brew services`
- ✅ Deploys WAR files to correct location
- ✅ Starts Tomcat using `brew services`

## 📍 Homebrew Tomcat Locations

### Apple Silicon (M1/M2/M3)
- **Tomcat Home:** `/opt/homebrew/opt/tomcat/libexec`
- **Webapps:** `/opt/homebrew/opt/tomcat/libexec/webapps`
- **Config:** `/opt/homebrew/etc/tomcat`
- **Logs:** `/opt/homebrew/var/log/tomcat/catalina.out`

### Intel Mac
- **Tomcat Home:** `/usr/local/opt/tomcat/libexec`
- **Webapps:** `/usr/local/opt/tomcat/libexec/webapps`
- **Config:** `/usr/local/etc/tomcat`
- **Logs:** `/usr/local/var/log/tomcat/catalina.out`

## 🎯 Complete Deployment Steps

```bash
# 1. Ensure Tomcat is running
brew services start tomcat

# 2. Deploy (auto-detects Homebrew)
./deploy-native.sh

# 3. Wait for deployment (20 seconds)
sleep 20

# 4. Test
curl http://localhost:8080/spec-producer/status
curl http://localhost:8080/spec-consumer/status

# 5. View logs
tail -f /opt/homebrew/var/log/tomcat/catalina.out  # Apple Silicon
# OR
tail -f /usr/local/var/log/tomcat/catalina.out     # Intel Mac
```

## 🔧 Tomcat Management Commands

```bash
# Start Tomcat
brew services start tomcat

# Stop Tomcat
brew services stop tomcat

# Restart Tomcat
brew services restart tomcat

# Check status
brew services list | grep tomcat

# View info
brew info tomcat
```

## 📊 Deployment Script Features

The `deploy-native.sh` script now includes:

### Auto-Detection
```bash
# Automatically detects Homebrew Tomcat
Detected Homebrew Tomcat at /opt/homebrew/opt/tomcat/libexec
```

### Homebrew Integration
- Uses `brew services stop tomcat` instead of `shutdown.sh`
- Uses `brew services start tomcat` instead of `startup.sh`
- Deploys to correct Homebrew webapps directory

### Verification
- Checks Kafka connectivity
- Verifies Java and Maven
- Tests endpoints after deployment

## 🧪 Testing the Application

```bash
# Start consumer
curl http://localhost:8080/spec-consumer/start

# Start producer
curl http://localhost:8080/spec-producer/produce

# Watch logs (Apple Silicon)
tail -f /opt/homebrew/var/log/tomcat/catalina.out

# Watch logs (Intel Mac)
tail -f /usr/local/var/log/tomcat/catalina.out

# Check status
curl http://localhost:8080/spec-consumer/status
curl http://localhost:8080/spec-producer/status

# Stop services
curl http://localhost:8080/spec-producer/stop
curl http://localhost:8080/spec-consumer/stop
```

## 🌐 Web Access

- **Producer UI:** http://localhost:8080/spec-producer
- **Consumer UI:** http://localhost:8080/spec-consumer

## 🔍 Troubleshooting

### Build Fails with javax.annotation Error

**Fixed!** The `javax.annotation-api` dependency has been added.

```bash
mvn clean install
```

See `COMPILATION_FIX.md` for details.

### Tomcat Not Found

```bash
# Install Tomcat
brew install tomcat

# Verify installation
brew list tomcat
which tomcat

# Check if running
brew services list | grep tomcat
```

### Port 8080 Already in Use

```bash
# Find what's using the port
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change Tomcat port
vi /opt/homebrew/etc/tomcat/server.xml  # Apple Silicon
vi /usr/local/etc/tomcat/server.xml     # Intel Mac
```

### WAR Files Not Deploying

```bash
# Check if Tomcat is running
brew services list | grep tomcat

# Restart Tomcat
brew services restart tomcat

# Check webapps directory
ls -la /opt/homebrew/opt/tomcat/libexec/webapps/  # Apple Silicon
ls -la /usr/local/opt/tomcat/libexec/webapps/     # Intel Mac

# Check logs for errors
tail -50 /opt/homebrew/var/log/tomcat/catalina.out
```

### Cannot Connect to Kafka

```bash
# Test connectivity to your Kafka cluster
nc -zv 10.253.229.13 9092
nc -zv 10.253.228.68 9092
nc -zv 10.253.228.200 9092

# Check network/VPN connection
ping 10.253.229.13
```

## 📁 Project Structure on macOS

```
/opt/homebrew/opt/tomcat/libexec/webapps/  (Apple Silicon)
├── spec-producer.war
├── spec-producer/              (auto-deployed)
├── spec-consumer.war
└── spec-consumer/              (auto-deployed)

/opt/homebrew/var/log/tomcat/
└── catalina.out                (application logs)

/opt/homebrew/etc/tomcat/
├── server.xml                  (Tomcat config)
└── tomcat-users.xml            (users config)
```

## 🚀 Quick Commands Cheat Sheet

```bash
# Deploy
./deploy-native.sh

# Start Tomcat
brew services start tomcat

# Stop Tomcat
brew services stop tomcat

# Restart Tomcat
brew services restart tomcat

# View logs
tail -f /opt/homebrew/var/log/tomcat/catalina.out

# Test endpoints
curl http://localhost:8080/spec-producer/status
curl http://localhost:8080/spec-consumer/status

# Start consumer
curl http://localhost:8080/spec-consumer/start

# Start producer
curl http://localhost:8080/spec-producer/produce

# Stop services
curl http://localhost:8080/spec-producer/stop
curl http://localhost:8080/spec-consumer/stop

# Rebuild
mvn clean install
```

## 📚 Additional Documentation

- **HOMEBREW_MACOS.md** - Detailed Homebrew Tomcat guide
- **START_HERE.md** - Quick start guide
- **DEPLOYMENT_SIMPLE.md** - Simple deployment steps
- **COMPILATION_FIX.md** - Fix for javax.annotation error
- **CONFIGURATION.md** - Configuration options

## ✅ Verification Checklist

After deployment:

- [ ] `brew services list | grep tomcat` shows "started"
- [ ] http://localhost:8080/spec-producer loads
- [ ] http://localhost:8080/spec-consumer loads
- [ ] `curl http://localhost:8080/spec-producer/status` returns JSON
- [ ] `curl http://localhost:8080/spec-consumer/status` returns JSON
- [ ] Can start consumer
- [ ] Can start producer
- [ ] Orders appear in logs
- [ ] Can stop services

## 🎉 Summary

**Your deployment is now fully automated for macOS with Homebrew!**

1. ✅ Scripts auto-detect Homebrew Tomcat
2. ✅ Uses `brew services` commands
3. ✅ Deploys to correct locations
4. ✅ Works on both Apple Silicon and Intel Macs
5. ✅ No manual configuration needed

**Just run:**
```bash
./deploy-native.sh
```

**And you're done!** 🚀

