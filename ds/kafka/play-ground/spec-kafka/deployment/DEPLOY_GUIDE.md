# Deployment Guide - Rocky Linux

Complete guide for deploying the Spec Kafka application on Rocky Linux using the unified deployment script (`deploy-rocky-unified.sh`).

## Table of Contents
- [Quick Start](#quick-start)
- [Deployment Script Options](#deployment-script-options)
- [Common Scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### First Time Deployment

```bash
# Navigate to project directory
cd /path/to/spec-kafka

# Run deployment script
sudo ./deployment/deploy-rocky-unified.sh
```

That's it! The script will:
1. ✅ Check Tomcat installation
2. ✅ Verify Kafka connectivity
3. ✅ Build the project
4. ✅ Stop Tomcat
5. ✅ Clean old deployments
6. ✅ Deploy new WARs
7. ✅ Start Tomcat
8. ✅ Wait for deployment
9. ✅ Test endpoints

---

## Deployment Script Options

### `deploy-rocky-unified.sh` - Advanced Deployment Script ⭐

**Full syntax:**
```bash
sudo ./deployment/deploy-rocky-unified.sh [options]
```

**Options:**

| Option | Description | Example |
|--------|-------------|---------|
| `--skip-build` | Skip Maven build, use existing WARs | `./deploy-rocky-unified.sh --skip-build` |
| `--skip-kafka` | Skip Kafka connectivity check | `./deploy-rocky-unified.sh --skip-kafka` |
| `--wait N` | Wait N seconds for deployment (default: 40) | `./deploy-rocky-unified.sh --wait 60` |
| `-h, --help` | Show help message | `./deploy-rocky-unified.sh --help` |

**Features:**
- ✅ Color-coded output (info, success, warning, error)
- ✅ Progress indicators during deployment
- ✅ Automatic Tomcat structure verification
- ✅ Kafka connectivity check
- ✅ Endpoint testing
- ✅ Comprehensive error messages
- ✅ Works with or without sudo

---

## Common Scenarios

### Scenario 1: First Time Deployment

```bash
# Full deployment with all checks
cd /path/to/spec-kafka
sudo ./deployment/deploy-rocky-unified.sh
```

**What happens:**
- Builds project from scratch
- Checks Kafka connectivity
- Deploys both applications
- Waits 40 seconds
- Tests endpoints

**Expected output:**
```
[✓] Build complete
[✓] Tomcat stopped
[✓] Old deployments removed
[✓] WARs deployed with correct ownership
[✓] Tomcat started successfully
[✓] Applications deployed after 25 seconds
[✓] Producer is accessible: http://localhost:8080/spec-producer
[✓] Consumer is accessible: http://localhost:8080/spec-consumer
✓ Deployment Successful!
```

---

### Scenario 2: Quick Redeployment (Code Changes)

```bash
# Rebuild and redeploy
cd /path/to/spec-kafka
sudo ./deployment/deploy-rocky-unified.sh
```

**When to use:**
- After making code changes
- After pulling new code from git
- When you need a fresh build

---

### Scenario 3: Redeploy Without Rebuilding

```bash
# Just redeploy existing WARs
cd /path/to/spec-kafka
sudo ./deployment/deploy-rocky-unified.sh --skip-build
```

**When to use:**
- WAR files already exist and are up-to-date
- Testing deployment process
- Faster redeployment

**Time saved:** ~2-3 minutes (no Maven build)

---

### Scenario 4: Deploy Without Kafka Check

```bash
# Skip Kafka connectivity check
cd /path/to/spec-kafka
sudo ./deployment/deploy-rocky-unified.sh --skip-kafka
```

**When to use:**
- Kafka is temporarily unavailable
- You know Kafka is working
- Faster deployment

---

### Scenario 5: Deploy with Custom Wait Time

```bash
# Wait 60 seconds for deployment
cd /path/to/spec-kafka
sudo ./deployment/deploy-rocky-unified.sh --wait 60
```

**When to use:**
- Slow server
- Large applications
- Previous deployments took longer

---

### Scenario 6: Fastest Redeployment

```bash
# Skip everything possible
cd /path/to/spec-kafka
sudo ./deployment/deploy-rocky-unified.sh --skip-build --skip-kafka --wait 30
```

**When to use:**
- Development/testing
- Multiple rapid redeployments
- Known working environment

**Time:** ~1 minute total

---

## Detailed Workflow

### What the Script Does

```
┌─────────────────────────────────────────┐
│ 1. Parse Command Line Options          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 2. Verify Tomcat Installation          │
│    - Check /opt/tomcat/webapps exists  │
│    - Suggest fix if incorrect          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 3. Check Kafka Connectivity (optional) │
│    - Test 3 broker addresses           │
│    - Warn if unreachable               │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 4. Build Project (optional)            │
│    - mvn clean install -DskipTests     │
│    - Verify WAR files created          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 5. Stop Tomcat                          │
│    - systemctl stop tomcat             │
│    - Force kill if needed              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 6. Clean Old Deployments                │
│    - Remove spec-producer*             │
│    - Remove spec-consumer*             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 7. Deploy New WARs                      │
│    - Copy spec-producer.war            │
│    - Copy spec-consumer.war            │
│    - Set tomcat:tomcat ownership       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 8. Start Tomcat                         │
│    - systemctl start tomcat            │
│    - Verify service started            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 9. Wait for Deployment                  │
│    - Check every second                │
│    - Progress updates every 10s        │
│    - Break early if deployed           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 10. Test Endpoints                      │
│     - curl spec-producer/status        │
│     - curl spec-consumer/status        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 11. Display Results                     │
│     - URLs and API endpoints           │
│     - Log commands                     │
│     - Troubleshooting tips if needed   │
└─────────────────────────────────────────┘
```

---

## Comparison with Other Scripts

| Feature | deploy-rocky-unified.sh | deploy-rocky.sh | deploy-manual.sh | redeploy-quick.sh |
|---------|-----------|-----------------|------------------|-------------------|
| **Platform** | Rocky Linux | Rocky Linux | Any | Rocky Linux |
| **Tomcat Control** | systemctl | systemctl | catalina.sh | systemctl |
| **Options** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Color Output** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Progress Bar** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Kafka Check** | ✅ Optional | ✅ Yes | ✅ Yes | ❌ No |
| **Build Check** | ✅ Optional | ✅ Yes | ✅ Yes | ✅ Yes |
| **Error Handling** | ✅ Advanced | ✅ Basic | ✅ Basic | ✅ Basic |
| **Help Message** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Recommended** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

**Recommendation:** Use `deploy-rocky-unified.sh` for all Rocky Linux deployments.

---

## Troubleshooting

### Issue: "Tomcat webapps directory not found"

**Error:**
```
[✗] Tomcat webapps directory not found at /opt/tomcat/webapps
```

**Solution:**
```bash
sudo ./deployment/fix-tomcat-structure.sh
sudo ./deployment/deploy.sh
```

---

### Issue: "WAR files not found"

**Error:**
```
[✗] spec-producer.war not found after build
```

**Solution:**
```bash
# Build manually first
mvn clean install

# Then deploy
sudo ./deployment/deploy.sh --skip-build
```

---

### Issue: "Applications not fully deployed"

**Warning:**
```
[⚠] Applications not fully deployed after 40 seconds
```

**Solution:**
```bash
# Wait longer
sudo ./deployment/deploy-rocky-unified.sh --wait 60

# Or check logs
tail -100 /opt/tomcat/logs/catalina.out | grep -i error
```

---

### Issue: "Producer/Consumer not accessible"

**Warning:**
```
[⚠] Producer not accessible yet: http://localhost:8080/spec-producer
```

**Solutions:**

1. **Wait and retry:**
```bash
sleep 30
curl http://localhost:8080/spec-producer/status
```

2. **Check logs:**
```bash
tail -100 /opt/tomcat/logs/catalina.out
journalctl -u tomcat -n 50
```

3. **Check deployment:**
```bash
ls -la /opt/tomcat/webapps/
# Should see spec-producer/ and spec-consumer/ directories
```

4. **Restart Tomcat:**
```bash
sudo systemctl restart tomcat
sleep 40
curl http://localhost:8080/spec-producer/status
```

---

### Issue: "Cannot reach Kafka cluster"

**Warning:**
```
[⚠] Cannot reach Kafka cluster
```

**Solutions:**

1. **Check network connectivity:**
```bash
nc -zv 10.253.228.200 9092
```

2. **Skip check and deploy anyway:**
```bash
sudo ./deployment/deploy.sh --skip-kafka
```

3. **Contact Kafka administrator** for cluster status

---

## Best Practices

### Development Environment

```bash
# Fast iteration during development
sudo ./deployment/deploy-rocky-unified.sh --skip-kafka --wait 30
```

### Production Environment

```bash
# Full checks for production
sudo ./deployment/deploy-rocky-unified.sh
```

### After Git Pull

```bash
# Rebuild and redeploy
sudo ./deployment/deploy-rocky-unified.sh
```

### Configuration Changes Only

```bash
# No code changes, just config
sudo ./deployment/deploy-rocky-unified.sh --skip-build
```

---

## Exit Codes

| Exit Code | Meaning |
|-----------|---------|
| 0 | Success - both applications accessible |
| 1 | Failure - one or more applications not accessible |

**Usage in scripts:**
```bash
if sudo ./deployment/deploy-rocky-unified.sh; then
    echo "Deployment successful"
else
    echo "Deployment failed"
    exit 1
fi
```

---

## Summary

**For most use cases, simply run:**
```bash
sudo ./deployment/deploy-rocky-unified.sh
```

**For quick redeployment:**
```bash
sudo ./deployment/deploy-rocky-unified.sh --skip-build
```

**For fastest deployment:**
```bash
sudo ./deployment/deploy-rocky-unified.sh --skip-build --skip-kafka --wait 30
```

That's it! The script handles everything else automatically. 🚀

