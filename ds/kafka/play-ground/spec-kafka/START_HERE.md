# 🚀 START HERE - Quick Reference

## ✅ Your Application is Ready!

**Configured for your Kafka cluster:**
- 10.253.228.200:9092

**No Kafka installation needed!**

## 📋 Prerequisites

### macOS (Homebrew)

```bash
# Check prerequisites
java -version    # Need Java 11+
mvn -version     # Need Maven 3.6+

# Install Tomcat 9 (required for javax.servlet compatibility)
brew install tomcat@9
brew services start tomcat@9
```

**If you have Tomcat 10+ installed:**
```bash
brew uninstall tomcat
brew install tomcat@9
brew services start tomcat@9
```

### Rocky Linux (Automated)

```bash
# One-command installation of ALL dependencies
cd deployment
sudo ./install-dependencies-rocky.sh

# This installs: JDK 17, Maven 3.9.5, Tomcat 9.0.84
# See deployment/ROCKY_LINUX_SETUP.md for details
```

### Manual Installation (Any Linux)

```bash
export TOMCAT_HOME=/opt/tomcat
```

**⚠️ Important:** This application requires **Tomcat 9** (uses javax.servlet). Tomcat 10+ uses jakarta.servlet and is not compatible. See `TOMCAT_VERSION_FIX.md` for details.

## 🎯 Deploy in 30 Seconds

### Option 1: Manual Deployment (Recommended)
```bash
cd deployment
./deploy-manual.sh
```

### Option 2: Automatic (with brew services)
```bash
cd deployment
./deploy-native.sh
```

**Note:** All deployment scripts are in the `deployment/` folder. Use `deploy-manual.sh` for most reliable results.

## 🧪 Test in 10 Seconds

```bash
# Automated testing
cd deployment
./test-application.sh
```

## 🎮 Use the Application

```bash
# 1. Start consumer
curl http://localhost:8080/spec-consumer/start

# 2. Start producer
curl http://localhost:8080/spec-producer/produce

# 3. Watch orders (Ctrl+C to stop)
tail -f $TOMCAT_HOME/logs/catalina.out

# 4. Stop when done
curl http://localhost:8080/spec-producer/stop
curl http://localhost:8080/spec-consumer/stop
```

## 🌐 Web Access

- **Producer UI:** http://localhost:8080/spec-producer
- **Consumer UI:** http://localhost:8080/spec-consumer

## 📚 Documentation Quick Links

| Document | When to Read |
|----------|-------------|
| **START_HERE.md** | You are here! Quick start |
| **DEPLOYMENT_SIMPLE.md** | Simple deployment steps |
| **CONFIGURATION.md** | Change settings |
| **TOMCAT_DEPLOYMENT.md** | Detailed deployment guide |
| **README.md** | Complete documentation |
| **kafka-setup/README.md** | Local Kafka (optional) |

## 🔧 Common Tasks

### Rebuild and Redeploy

```bash
mvn clean install
cd deployment
./deploy-manual.sh
```

### Check Status

```bash
# Producer
curl http://localhost:8080/spec-producer/status

# Consumer (includes message count)
curl http://localhost:8080/spec-consumer/status
```

### View Logs

```bash
# Application logs
tail -f $TOMCAT_HOME/logs/catalina.out

# Look for order consumption:
# ========================================
# Consumed Order #1
# Order ID: ORD-XXXXXXXX
# ...
```

### Change Configuration

```bash
# Edit Kafka settings
vi spec-kafka-client/src/main/resources/kafka.properties

# Rebuild
mvn clean install

# Redeploy
./deploy-native.sh
```

## 🛠️ Scripts Reference

All scripts are in the `deployment/` folder:

| Script | What It Does |
|--------|-------------|
| `deployment/deploy-manual.sh` | Build, stop Tomcat, deploy, start Tomcat (recommended) |
| `deployment/deploy-native.sh` | Same as above but uses brew services |
| `deployment/start-services.sh` | Start Tomcat, check Kafka connectivity |
| `deployment/stop-services.sh` | Stop Tomcat and applications |
| `deployment/test-application.sh` | Test all endpoints automatically |

## 🔍 Troubleshooting

### Compilation Error: javax.annotation does not exist

If you see this error when building:
```
[ERROR] package javax.annotation does not exist
```

**Fix:** The `javax.annotation-api` dependency has been added to the POMs. Just rebuild:
```bash
mvn clean install
```

See `COMPILATION_FIX.md` for details.

### Servlet Error: NoClassDefFoundError javax/servlet/ServletContextListener

If you see this error in Tomcat logs:
```
java.lang.NoClassDefFoundError: javax/servlet/ServletContextListener
```

**Fix:** You have Tomcat 10+ but need Tomcat 9:
```bash
brew uninstall tomcat
brew install tomcat@9
brew services start tomcat@9
./deploy-native.sh
```

See `TOMCAT_VERSION_FIX.md` for details.

### Cannot connect to Kafka

```bash
# Test connectivity
nc -zv 10.253.228.200 9092

# Check firewall/network
ping 10.253.228.200
```

### Application not responding

```bash
# Check Tomcat is running
ps aux | grep tomcat

# Check logs for errors
tail -f $TOMCAT_HOME/logs/catalina.out
```

### WAR not deploying

```bash
# Verify WAR files exist
ls -lh spec-producer-webapp/target/spec-producer.war
ls -lh spec-consumer-webapp/target/spec-consumer.war

# Check Tomcat webapps
ls -l $TOMCAT_HOME/webapps/
```

## 🎓 Learning Path

**Beginner:**
1. Read this file (START_HERE.md)
2. Run `./deploy-native.sh`
3. Run `./test-application.sh`
4. Open web UIs in browser

**Intermediate:**
1. Read DEPLOYMENT_SIMPLE.md
2. Read CONFIGURATION.md
3. Try changing kafka.properties
4. Rebuild and test

**Advanced:**
1. Read TOMCAT_DEPLOYMENT.md
2. Read PROJECT_STRUCTURE.md
3. Explore source code
4. Customize OrderProducerService

## ⚡ Quick Commands Cheat Sheet

```bash
# Build
mvn clean install

# Deploy
cd deployment && ./deploy-manual.sh

# Test
cd deployment && ./test-application.sh

# Start consumer
curl http://localhost:8080/spec-consumer/start

# Start producer
curl http://localhost:8080/spec-producer/produce

# Check status
curl http://localhost:8080/spec-consumer/status
curl http://localhost:8080/spec-producer/status

# Stop
curl http://localhost:8080/spec-producer/stop
curl http://localhost:8080/spec-consumer/stop

# Logs
tail -f /opt/homebrew/opt/tomcat@9/libexec/logs/catalina.out

# Restart Tomcat
cd deployment && ./stop-services.sh && ./start-services.sh
```

## 📊 Project Structure

```
spec-kafka/
├── 📄 START_HERE.md              ← You are here
├── 📄 DEPLOYMENT_SIMPLE.md       ← Simple deployment
├── 📄 CONFIGURATION.md           ← Configuration guide
├── 📄 README.md                  ← Full documentation
│
├── 🚀 deployment/                ← Deployment scripts
│   ├── deploy-manual.sh          ← Main deployment (recommended)
│   ├── deploy-native.sh          ← Deployment with brew services
│   ├── start-services.sh         ← Start Tomcat
│   ├── stop-services.sh          ← Stop Tomcat
│   ├── test-application.sh       ← Test endpoints
│   └── README.md                 ← Deployment guide
│
├── 📦 6 Maven modules            ← Application code
│   ├── spec-model
│   ├── spec-kafka-client
│   ├── spec-order-producer
│   ├── spec-order-consumer
│   ├── spec-producer-webapp
│   └── spec-consumer-webapp
│
└── 🔌 kafka-setup/               ← Optional local Kafka
    └── README.md
```

## ✅ Success Checklist

After deployment, verify:

- [ ] `./deploy-native.sh` completed successfully
- [ ] http://localhost:8080/spec-producer loads
- [ ] http://localhost:8080/spec-consumer loads
- [ ] `curl http://localhost:8080/spec-producer/status` returns JSON
- [ ] `curl http://localhost:8080/spec-consumer/status` returns JSON
- [ ] Consumer can be started
- [ ] Producer can be started
- [ ] Orders appear in logs
- [ ] Services can be stopped

## 🎉 You're All Set!

Your application is configured and ready to use with your Kafka cluster.

**Next steps:**
1. Run `cd deployment && ./deploy-manual.sh`
2. Run `cd deployment && ./test-application.sh`
3. Start using the application!

**Need help?**
- See DEPLOYMENT_SIMPLE.md for step-by-step guide
- See CONFIGURATION.md for settings
- See README.md for complete documentation

**Happy coding!** 🚀

