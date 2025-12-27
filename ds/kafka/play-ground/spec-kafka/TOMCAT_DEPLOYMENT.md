# Tomcat Deployment Guide (No Docker/K8s)

This guide shows how to deploy the Spec Kafka application directly to Apache Tomcat without using Docker or Kubernetes.

## Prerequisites

### 1. Install Java 11+

**macOS:**
```bash
# Using Homebrew
brew install openjdk@11

# Set JAVA_HOME
export JAVA_HOME=/usr/local/opt/openjdk@11
export PATH=$JAVA_HOME/bin:$PATH

# Verify
java -version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install openjdk-11-jdk

# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Verify
java -version
```

**Windows:**
1. Download JDK 11 from https://adoptium.net/
2. Install and set JAVA_HOME environment variable
3. Add `%JAVA_HOME%\bin` to PATH

### 2. Install Maven

**macOS:**
```bash
brew install maven
mvn -version
```

**Linux:**
```bash
sudo apt update
sudo apt install maven
mvn -version
```

**Windows:**
1. Download from https://maven.apache.org/download.cgi
2. Extract and set M2_HOME
3. Add `%M2_HOME%\bin` to PATH

### 3. Install Apache Tomcat 9

**macOS/Linux:**
```bash
# Download Tomcat 9
cd /opt
sudo wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.84/bin/apache-tomcat-9.0.84.tar.gz
sudo tar -xzf apache-tomcat-9.0.84.tar.gz
sudo ln -s apache-tomcat-9.0.84 tomcat

# Set permissions
sudo chmod +x /opt/tomcat/bin/*.sh

# Set TOMCAT_HOME
export TOMCAT_HOME=/opt/tomcat
```

**Windows:**
1. Download from https://tomcat.apache.org/download-90.cgi
2. Extract to `C:\tomcat`
3. Set TOMCAT_HOME environment variable

### 4. Install Apache Kafka (Native)

**macOS:**
```bash
# Using Homebrew
brew install kafka

# Kafka will be installed at /usr/local/opt/kafka
# Zookeeper config: /usr/local/etc/kafka/zookeeper.properties
# Kafka config: /usr/local/etc/kafka/server.properties
```

**Linux:**
```bash
# Download Kafka
cd /opt
sudo wget https://downloads.apache.org/kafka/3.6.1/kafka_2.13-3.6.1.tgz
sudo tar -xzf kafka_2.13-3.6.1.tgz
sudo ln -s kafka_2.13-3.6.1 kafka

# Set KAFKA_HOME
export KAFKA_HOME=/opt/kafka
export PATH=$KAFKA_HOME/bin:$PATH
```

**Windows:**
1. Download from https://kafka.apache.org/downloads
2. Extract to `C:\kafka`
3. Set KAFKA_HOME environment variable

## Step-by-Step Deployment

### Step 1: Start Kafka and Zookeeper

**macOS (Homebrew):**
```bash
# Start Zookeeper
brew services start zookeeper

# Start Kafka
brew services start kafka

# Verify services
brew services list
```

**Linux/Windows (Manual):**
```bash
# Terminal 1: Start Zookeeper
cd $KAFKA_HOME
bin/zookeeper-server-start.sh config/zookeeper.properties
# Windows: bin\windows\zookeeper-server-start.bat config\zookeeper.properties

# Terminal 2: Start Kafka
cd $KAFKA_HOME
bin/kafka-server-start.sh config/server.properties
# Windows: bin\windows\kafka-server-start.bat config\server.properties

# Wait 10-15 seconds for services to start
```

**Verify Kafka is Running:**
```bash
# List topics (should show empty list or default topics)
$KAFKA_HOME/bin/kafka-topics.sh --list --bootstrap-server localhost:9092

# Create the orders topic (optional - will auto-create)
$KAFKA_HOME/bin/kafka-topics.sh --create \
  --topic orders \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1
```

### Step 2: Build the Application

```bash
# Navigate to project directory
cd /Users/mcheedhe/Data/techdocs/ds/kafka/play-ground/spec-kafka

# Clean and build all modules
mvn clean install

# This will create:
# - spec-producer-webapp/target/spec-producer.war
# - spec-consumer-webapp/target/spec-consumer.war
```

**Verify Build:**
```bash
ls -lh spec-producer-webapp/target/spec-producer.war
ls -lh spec-consumer-webapp/target/spec-consumer.war
```

### Step 3: Configure Kafka Connection (if needed)

If your Kafka is not on `localhost:9092`, update the configuration:

```bash
# Edit kafka.properties
vi spec-kafka-client/src/main/resources/kafka.properties
```

Update:
```properties
kafka.bootstrap.servers=localhost:9092
kafka.topic.name=orders
kafka.serialization.format=JSON
kafka.consumer.group.id=order-consumer-group
```

Then rebuild:
```bash
mvn clean install
```

### Step 4: Deploy to Tomcat

**Option A: Manual Deployment (Recommended for Development)**

```bash
# Stop Tomcat if running
$TOMCAT_HOME/bin/shutdown.sh
# Windows: %TOMCAT_HOME%\bin\shutdown.bat

# Wait for shutdown
sleep 5

# Remove old deployments
rm -rf $TOMCAT_HOME/webapps/spec-producer*
rm -rf $TOMCAT_HOME/webapps/spec-consumer*

# Copy new WAR files
cp spec-producer-webapp/target/spec-producer.war $TOMCAT_HOME/webapps/
cp spec-consumer-webapp/target/spec-consumer.war $TOMCAT_HOME/webapps/

# Start Tomcat
$TOMCAT_HOME/bin/startup.sh
# Windows: %TOMCAT_HOME%\bin\startup.bat

# Watch logs
tail -f $TOMCAT_HOME/logs/catalina.out
# Windows: type %TOMCAT_HOME%\logs\catalina.out
```

**Option B: Hot Deployment (Tomcat Running)**

```bash
# Just copy WAR files while Tomcat is running
cp spec-producer-webapp/target/spec-producer.war $TOMCAT_HOME/webapps/
cp spec-consumer-webapp/target/spec-consumer.war $TOMCAT_HOME/webapps/

# Tomcat will auto-deploy in 10-20 seconds
# Watch logs to confirm deployment
tail -f $TOMCAT_HOME/logs/catalina.out
```

### Step 5: Verify Deployment

**Check Tomcat Logs:**
```bash
# Watch for deployment messages
tail -f $TOMCAT_HOME/logs/catalina.out

# Look for:
# - "Deployment of web application directory [.../spec-producer] has finished"
# - "Deployment of web application directory [.../spec-consumer] has finished"
```

**Check Deployed Applications:**
```bash
# List deployed webapps
ls -l $TOMCAT_HOME/webapps/

# You should see:
# - spec-producer.war
# - spec-producer/ (directory)
# - spec-consumer.war
# - spec-consumer/ (directory)
```

**Test Endpoints:**
```bash
# Test producer
curl http://localhost:8080/spec-producer/status

# Expected response:
# {"status":"success","message":"Producer is stopped","producing":false}

# Test consumer
curl http://localhost:8080/spec-consumer/status

# Expected response:
# {"status":"success","message":"Consumer is stopped","consuming":false,"messageCount":0}
```

### Step 6: Test the Application

**1. Open Web UIs in Browser:**
- Producer: http://localhost:8080/spec-producer
- Consumer: http://localhost:8080/spec-consumer

**2. Start Consumer:**
```bash
curl http://localhost:8080/spec-consumer/start

# Response:
# {"status":"success","message":"Order consumer started successfully","consuming":true,"messageCount":0}
```

**3. Start Producer:**
```bash
curl http://localhost:8080/spec-producer/produce

# Response:
# {"status":"success","message":"Order production started successfully","producing":true}
```

**4. Monitor Logs:**
```bash
# Watch Tomcat logs for order processing
tail -f $TOMCAT_HOME/logs/catalina.out

# You should see orders being consumed:
# ========================================
# Consumed Order #1
# Order ID: ORD-A1B2C3D4
# Customer: John Doe (CUST-123)
# ...
# ========================================
```

**5. Check Kafka Messages:**
```bash
# View messages in Kafka topic
$KAFKA_HOME/bin/kafka-console-consumer.sh \
  --topic orders \
  --from-beginning \
  --bootstrap-server localhost:9092 \
  --max-messages 5
```

**6. Stop Services:**
```bash
# Stop producer
curl http://localhost:8080/spec-producer/stop

# Stop consumer
curl http://localhost:8080/spec-consumer/stop
```

## Complete Deployment Script

Save as `deploy-native.sh`:

```bash
#!/bin/bash

set -e

# Configuration
TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}
KAFKA_HOME=${KAFKA_HOME:-/opt/kafka}
PROJECT_DIR=$(pwd)

echo "========================================="
echo "Spec Kafka - Native Tomcat Deployment"
echo "========================================="

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v java &> /dev/null; then
    echo "ERROR: Java not found. Please install Java 11+"
    exit 1
fi

if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven not found. Please install Maven"
    exit 1
fi

if [ ! -d "$TOMCAT_HOME" ]; then
    echo "ERROR: Tomcat not found at $TOMCAT_HOME"
    echo "Please set TOMCAT_HOME environment variable"
    exit 1
fi

echo "✓ Java: $(java -version 2>&1 | head -n 1)"
echo "✓ Maven: $(mvn -version | head -n 1)"
echo "✓ Tomcat: $TOMCAT_HOME"

# Check if Kafka is running
echo ""
echo "Checking Kafka..."
if nc -z localhost 9092 2>/dev/null; then
    echo "✓ Kafka is running on localhost:9092"
else
    echo "WARNING: Kafka does not appear to be running on localhost:9092"
    echo "Please start Kafka before proceeding"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build project
echo ""
echo "Building project..."
mvn clean install -DskipTests
echo "✓ Build complete"

# Stop Tomcat
echo ""
echo "Stopping Tomcat..."
$TOMCAT_HOME/bin/shutdown.sh 2>/dev/null || true
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
$TOMCAT_HOME/bin/startup.sh
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
echo "Access the applications:"
echo "  Producer: http://localhost:8080/spec-producer"
echo "  Consumer: http://localhost:8080/spec-consumer"
echo ""
echo "Quick test commands:"
echo "  curl http://localhost:8080/spec-consumer/start"
echo "  curl http://localhost:8080/spec-producer/produce"
echo "  tail -f $TOMCAT_HOME/logs/catalina.out"
echo ""
echo "View logs:"
echo "  tail -f $TOMCAT_HOME/logs/catalina.out"
echo ""
```

Make it executable:
```bash
chmod +x deploy-native.sh
./deploy-native.sh
```

## Startup Scripts

### Start All Services Script

Save as `start-services.sh`:

```bash
#!/bin/bash

KAFKA_HOME=${KAFKA_HOME:-/opt/kafka}
TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}

echo "Starting services..."

# Start Zookeeper (background)
echo "Starting Zookeeper..."
$KAFKA_HOME/bin/zookeeper-server-start.sh $KAFKA_HOME/config/zookeeper.properties > /tmp/zookeeper.log 2>&1 &
sleep 5

# Start Kafka (background)
echo "Starting Kafka..."
$KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties > /tmp/kafka.log 2>&1 &
sleep 10

# Start Tomcat
echo "Starting Tomcat..."
$TOMCAT_HOME/bin/startup.sh

echo "All services started!"
echo "  Zookeeper: localhost:2181 (logs: /tmp/zookeeper.log)"
echo "  Kafka: localhost:9092 (logs: /tmp/kafka.log)"
echo "  Tomcat: localhost:8080 (logs: $TOMCAT_HOME/logs/catalina.out)"
```

### Stop All Services Script

Save as `stop-services.sh`:

```bash
#!/bin/bash

KAFKA_HOME=${KAFKA_HOME:-/opt/kafka}
TOMCAT_HOME=${TOMCAT_HOME:-/opt/tomcat}

echo "Stopping services..."

# Stop applications
curl -s http://localhost:8080/spec-producer/stop > /dev/null 2>&1 || true
curl -s http://localhost:8080/spec-consumer/stop > /dev/null 2>&1 || true

# Stop Tomcat
echo "Stopping Tomcat..."
$TOMCAT_HOME/bin/shutdown.sh

# Stop Kafka
echo "Stopping Kafka..."
$KAFKA_HOME/bin/kafka-server-stop.sh

# Stop Zookeeper
echo "Stopping Zookeeper..."
$KAFKA_HOME/bin/zookeeper-server-stop.sh

echo "All services stopped!"
```

Make scripts executable:
```bash
chmod +x start-services.sh stop-services.sh
```

## Troubleshooting

### Port Already in Use

**Check what's using port 8080:**
```bash
# macOS/Linux
lsof -i :8080
netstat -an | grep 8080

# Windows
netstat -ano | findstr :8080
```

**Change Tomcat port:**
Edit `$TOMCAT_HOME/conf/server.xml`:
```xml
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
```
Change `port="8080"` to `port="8081"` or any available port.

### Kafka Not Starting

**Check if Zookeeper is running:**
```bash
echo stat | nc localhost 2181
```

**Check Kafka logs:**
```bash
tail -f $KAFKA_HOME/logs/server.log
```

**Common issues:**
- Port 9092 already in use
- Zookeeper not running
- Insufficient memory

### WAR Not Deploying

**Check Tomcat logs:**
```bash
tail -f $TOMCAT_HOME/logs/catalina.out
```

**Common issues:**
- Port 8080 in use
- Insufficient permissions
- Missing dependencies
- Java version mismatch

### Application Errors

**Check application logs:**
```bash
# Tomcat logs
tail -f $TOMCAT_HOME/logs/catalina.out

# Application logs (if configured)
tail -f logs/spec-producer.log
tail -f logs/spec-consumer.log
```

**Enable debug logging:**
Edit `logback.xml` in each webapp:
```xml
<logger name="com.spec.kafka" level="DEBUG"/>
```

## Production Considerations

### 1. Configure Tomcat for Production

Edit `$TOMCAT_HOME/conf/server.xml`:
```xml
<!-- Increase thread pool -->
<Connector port="8080" protocol="HTTP/1.1"
           maxThreads="200"
           minSpareThreads="25"
           connectionTimeout="20000"
           redirectPort="8443" />
```

### 2. Configure JVM Memory

Edit `$TOMCAT_HOME/bin/setenv.sh` (create if doesn't exist):
```bash
export CATALINA_OPTS="$CATALINA_OPTS -Xms512m"
export CATALINA_OPTS="$CATALINA_OPTS -Xmx2048m"
export CATALINA_OPTS="$CATALINA_OPTS -XX:MaxPermSize=256m"
```

### 3. Configure Kafka for Production

Edit `$KAFKA_HOME/config/server.properties`:
```properties
# Increase partitions for better throughput
num.partitions=3

# Enable log retention
log.retention.hours=168

# Increase buffer sizes
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
```

### 4. Setup as System Service

**Tomcat as systemd service (Linux):**

Create `/etc/systemd/system/tomcat.service`:
```ini
[Unit]
Description=Apache Tomcat
After=network.target

[Service]
Type=forking
User=tomcat
Group=tomcat
Environment="JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64"
Environment="CATALINA_HOME=/opt/tomcat"
ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable tomcat
sudo systemctl start tomcat
sudo systemctl status tomcat
```

## Summary

You now have a complete native deployment without Docker/K8s:

1. ✅ Kafka running natively on localhost:9092
2. ✅ Tomcat running natively on localhost:8080
3. ✅ Both WAR files deployed and accessible
4. ✅ Scripts for easy deployment and management

Use the provided scripts for quick deployment:
- `deploy-native.sh` - Build and deploy
- `start-services.sh` - Start all services
- `stop-services.sh` - Stop all services

