# Deployment Scripts

This folder contains all deployment-related scripts for the Spec Kafka application.

## Scripts Overview

| Script | Purpose | Usage |
|--------|---------|-------|
| **Installation** | | |
| `install-dependencies-rocky-dnf.sh` | Install JDK, Maven, Tomcat (Rocky Linux - DNF) | `sudo ./install-dependencies-rocky-dnf.sh` |
| `install-dependencies-rocky.sh` | Install JDK, Maven, Tomcat (Rocky Linux - Manual) | `sudo ./install-dependencies-rocky.sh` |
| **Deployment** | | |
| `deploy-rocky-unified.sh` | **Advanced Rocky Linux deployment** ⭐ | `sudo ./deploy-rocky-unified.sh` |
| `deploy-rocky.sh` | Rocky Linux deployment (basic) | `sudo ./deploy-rocky.sh` |
| `deploy-manual.sh` | Manual deployment (catalina.sh) | `./deploy-manual.sh` |
| `deploy-native.sh` | macOS deployment (brew services) | `./deploy-native.sh` |
| `redeploy-quick.sh` | Quick redeploy (no checks) | `sudo ./redeploy-quick.sh` |
| **Utilities** | | |
| `fix-tomcat-structure.sh` | Fix Tomcat directory structure | `sudo ./fix-tomcat-structure.sh` |
| `start-services.sh` | Start Tomcat only | `./start-services.sh` |
| `stop-services.sh` | Stop Tomcat and applications | `./stop-services.sh` |
| `test-application.sh` | Test all endpoints | `./test-application.sh` |

## Quick Start

### Recommended: Use Manual Deployment

```bash
cd deployment
./deploy-manual.sh
```

This script:
- ✅ Checks Kafka connectivity
- ✅ Builds the application
- ✅ Stops Tomcat
- ✅ Deploys WAR files
- ✅ Starts Tomcat
- ✅ Tests endpoints

### Alternative: Use Native Deployment

```bash
cd deployment
./deploy-native.sh
```

Uses `brew services` commands (may have issues on some systems).

## Individual Operations

### Start Services

```bash
cd deployment
./start-services.sh
```

Starts Tomcat and checks Kafka connectivity.

### Stop Services

```bash
cd deployment
./stop-services.sh
```

Stops Tomcat and applications gracefully.

### Test Deployment

```bash
cd deployment
./test-application.sh
```

Tests all endpoints and verifies deployment.

## Quick Start (Rocky Linux)

### First Time Setup
```bash
# 1. Install dependencies
sudo ./install-dependencies-rocky-dnf.sh

# 2. Deploy application
cd /path/to/spec-kafka
sudo ./deployment/deploy-rocky-unified.sh
```

### Redeployment
```bash
# Full redeploy (rebuild + deploy)
sudo ./deployment/deploy-rocky-unified.sh

# Quick redeploy (skip build)
sudo ./deployment/deploy-rocky-unified.sh --skip-build

# Skip Kafka check
sudo ./deployment/deploy-rocky-unified.sh --skip-kafka

# Custom wait time
sudo ./deployment/deploy-rocky-unified.sh --wait 60
```

---

## Prerequisites

### For macOS

1. **Tomcat 9 installed:**
   ```bash
   brew install tomcat@9
   ```

### For Rocky Linux

1. **Install all dependencies automatically (Recommended - DNF):**
   ```bash
   sudo ./install-dependencies-rocky-dnf.sh
   ```
   
   Or use manual download version:
   ```bash
   sudo ./install-dependencies-rocky.sh
   ```
   
   Both install:
   - OpenJDK 17
   - Apache Maven (latest from repo or 3.9.6)
   - Apache Tomcat 9.0.96
   - Configures systemd service
   - Opens firewall port 8080
   
   **Note:** The DNF version is recommended as it's faster and avoids 404 errors from Apache mirrors.

### For All Systems

2. **Kafka cluster accessible:**
   - 10.253.229.13:9092
   - 10.253.228.68:9092
   - 10.253.228.200:9092

3. **Topic created:**
   ```bash
   kafka-topics.sh --create --topic orders \
     --bootstrap-server 10.253.229.13:9092 \
     --partitions 3 --replication-factor 2
   ```

## Deployment Workflow

### Full Deployment

```bash
# 1. Navigate to deployment folder
cd deployment

# 2. Deploy
./deploy-manual.sh

# 3. Wait for deployment (script waits automatically)

# 4. Test
./test-application.sh
```

### Update Deployment

```bash
# 1. Stop services
cd deployment
./stop-services.sh

# 2. Rebuild (from project root)
cd ..
mvn clean install

# 3. Redeploy
cd deployment
./deploy-manual.sh
```

### Quick Restart

```bash
cd deployment

# Stop
./stop-services.sh

# Start
./start-services.sh
```

## Troubleshooting

### Scripts Not Executable

```bash
cd deployment
chmod +x *.sh
```

### Tomcat Not Found

The scripts auto-detect Tomcat at:
- `/opt/homebrew/opt/tomcat@9` (Apple Silicon)
- `/usr/local/opt/tomcat@9` (Intel Mac)

If Tomcat is elsewhere, set:
```bash
export TOMCAT_HOME=/path/to/tomcat
```

### Kafka Not Reachable

Check connectivity:
```bash
nc -zv 10.253.229.13 9092
```

Ensure topic exists:
```bash
kafka-topics.sh --list --bootstrap-server 10.253.229.13:9092 | grep orders
```

### Deployment Fails

Check logs:
```bash
tail -50 /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out
```

## Script Details

### deploy-manual.sh

**What it does:**
1. Detects Tomcat location
2. Checks Kafka connectivity
3. Builds project (`mvn clean install -DskipTests`)
4. Stops Tomcat (`catalina stop`)
5. Cleans old deployments
6. Copies WAR files to webapps
7. Starts Tomcat (`catalina start`)
8. Waits 25 seconds
9. Tests endpoints

**When to use:** Primary deployment method (most reliable)

### deploy-native.sh

**What it does:**
Same as `deploy-manual.sh` but uses `brew services` commands.

**When to use:** If `brew services` works on your system

### start-services.sh

**What it does:**
1. Checks Kafka connectivity
2. Starts Tomcat

**When to use:** When Tomcat is stopped but apps are already deployed

### stop-services.sh

**What it does:**
1. Stops applications gracefully
2. Stops Tomcat

**When to use:** To cleanly shut down services

### test-application.sh

**What it does:**
1. Tests producer endpoints
2. Tests consumer endpoints
3. Starts producer and consumer
4. Waits for messages
5. Stops services

**When to use:** To verify deployment is working

## Logs

### View Tomcat Logs

```bash
# Apple Silicon
tail -f /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out

# Intel Mac
tail -f /usr/local/opt/tomcat@9/libexec/logs/catalina.out
```

### View Application Logs

Application logs are written to Tomcat's catalina.out.

Look for:
```
========================================
Consumed Order #1
Order ID: ORD-XXXXXXXX
...
========================================
```

## Common Commands

```bash
# Deploy
cd deployment && ./deploy-manual.sh

# Test
cd deployment && ./test-application.sh

# Stop
cd deployment && ./stop-services.sh

# View logs
tail -f /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out

# Restart Tomcat
cd deployment && ./stop-services.sh && ./start-services.sh
```

## Environment Variables

Optional environment variables:

```bash
# Tomcat location (auto-detected if not set)
export TOMCAT_HOME=/opt/homebrew/opt/tomcat@9

# Kafka location (only needed for local Kafka)
export KAFKA_HOME=/opt/kafka
```

## See Also

- `../START_HERE.md` - Quick start guide
- `../DEPLOYMENT_SIMPLE.md` - Simple deployment guide
- `../TOMCAT_DEPLOYMENT.md` - Detailed deployment guide
- `../TROUBLESHOOTING_404.md` - Fix 404 errors
- `../TOMCAT_VERSION_FIX.md` - Fix Tomcat version issues
- `../TOMCAT_STARTUP_FIX.md` - Fix startup issues

## Support

For issues:
1. Check logs: `tail -f /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out`
2. Verify Tomcat is running: `ps aux | grep tomcat`
3. Test connectivity: `nc -zv 10.253.229.13 9092`
4. Check documentation in parent directory

