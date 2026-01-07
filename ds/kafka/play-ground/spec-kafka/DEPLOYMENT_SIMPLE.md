# Simple Deployment Guide

## Quick Deployment (Using Your Kafka Cluster)

Your application is already configured to use your Kafka cluster at:
- `10.253.228.200:9092`

### Prerequisites

- Java 11+
- Maven 3.6+
- Apache Tomcat 9+
- Network access to Kafka cluster

### Step 1: Set Environment Variables

```bash
export JAVA_HOME=/path/to/java11
export TOMCAT_HOME=/opt/tomcat
```

### Step 2: Build and Deploy

```bash
# One command deployment
./deploy-native.sh
```

That's it! The script will:
1. Check Kafka connectivity
2. Build the application
3. Stop Tomcat
4. Deploy WAR files
5. Start Tomcat
6. Verify deployment

### Step 3: Test

```bash
# Test the application
./test-application.sh
```

Or manually:

```bash
# Start consumer
curl http://localhost:8080/spec-consumer/start

# Start producer
curl http://localhost:8080/spec-producer/produce

# Watch logs
tail -f $TOMCAT_HOME/logs/catalina.out
```

### Step 4: Access Web UIs

- Producer: http://localhost:8080/spec-producer
- Consumer: http://localhost:8080/spec-consumer

## Manual Deployment

If you prefer manual steps:

### 1. Build

```bash
mvn clean install
```

### 2. Stop Tomcat

```bash
$TOMCAT_HOME/bin/shutdown.sh
```

### 3. Deploy WAR Files

```bash
rm -rf $TOMCAT_HOME/webapps/spec-producer*
rm -rf $TOMCAT_HOME/webapps/spec-consumer*

cp spec-producer-webapp/target/spec-producer.war $TOMCAT_HOME/webapps/
cp spec-consumer-webapp/target/spec-consumer.war $TOMCAT_HOME/webapps/
```

### 4. Start Tomcat

```bash
$TOMCAT_HOME/bin/startup.sh
```

### 5. Wait for Deployment

```bash
# Wait 20 seconds
sleep 20

# Check logs
tail -f $TOMCAT_HOME/logs/catalina.out
```

## Verifying Deployment

### Check Kafka Connectivity

```bash
nc -zv 10.253.228.200 9092
```

### Check Tomcat

```bash
# Check if Tomcat is running
ps aux | grep tomcat

# Check deployed apps
ls -l $TOMCAT_HOME/webapps/
```

### Test Endpoints

```bash
# Producer status
curl http://localhost:8080/spec-producer/status

# Consumer status
curl http://localhost:8080/spec-consumer/status
```

Expected response:
```json
{"status":"success","message":"...","producing":false}
```

## Using the Application

### Start Consumer

```bash
curl http://localhost:8080/spec-consumer/start
```

### Start Producer

```bash
curl http://localhost:8080/spec-producer/produce
```

### Monitor Orders

```bash
# Watch application logs
tail -f $TOMCAT_HOME/logs/catalina.out

# You'll see:
# ========================================
# Consumed Order #1
# Order ID: ORD-XXXXXXXX
# Customer: John Doe (CUST-XXX)
# ...
# ========================================
```

### Check Status

```bash
# Producer status
curl http://localhost:8080/spec-producer/status

# Consumer status (includes message count)
curl http://localhost:8080/spec-consumer/status
```

### Stop Services

```bash
# Stop producer
curl http://localhost:8080/spec-producer/stop

# Stop consumer
curl http://localhost:8080/spec-consumer/stop
```

## Troubleshooting

### Cannot Connect to Kafka

```bash
# Test connectivity
nc -zv 10.253.228.200 9092
ping 10.253.228.200

# Check firewall
# Contact network admin if needed
```

### WAR Not Deploying

```bash
# Check Tomcat logs
tail -f $TOMCAT_HOME/logs/catalina.out

# Check WAR file exists
ls -lh spec-producer-webapp/target/spec-producer.war

# Verify Tomcat is running
ps aux | grep tomcat
```

### Application Errors

```bash
# Check logs
tail -f $TOMCAT_HOME/logs/catalina.out

# Look for:
# - ClassNotFoundException
# - Connection refused
# - Serialization errors
```

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `deploy-native.sh` | Build and deploy (all-in-one) |
| `start-services.sh` | Start Tomcat (check Kafka) |
| `stop-services.sh` | Stop Tomcat and applications |
| `test-application.sh` | Test all endpoints |

## Configuration

The application is configured in:
- `spec-kafka-client/src/main/resources/kafka.properties`

Current settings:
```properties
kafka.bootstrap.servers=10.253.228.200:9092
kafka.topic.name=orders
kafka.serialization.format=JSON
kafka.consumer.group.id=order-consumer-group
```

To change configuration:
1. Edit `kafka.properties`
2. Rebuild: `mvn clean install`
3. Redeploy: `./deploy-native.sh`

## Summary

**Simplest deployment:**
```bash
./deploy-native.sh
./test-application.sh
```

**Using the application:**
```bash
curl http://localhost:8080/spec-consumer/start
curl http://localhost:8080/spec-producer/produce
tail -f $TOMCAT_HOME/logs/catalina.out
```

**Stopping:**
```bash
curl http://localhost:8080/spec-producer/stop
curl http://localhost:8080/spec-consumer/stop
```

For more details, see:
- `TOMCAT_DEPLOYMENT.md` - Detailed deployment guide
- `CONFIGURATION.md` - Configuration options
- `README.md` - Complete documentation

