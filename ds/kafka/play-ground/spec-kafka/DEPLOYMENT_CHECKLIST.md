# Deployment Checklist - Native Tomcat Deployment

Use this checklist to ensure successful deployment without Docker/K8s.

## ✅ File Verification

All required files are present:

### Source Files
- [x] `pom.xml` (Parent POM)
- [x] `spec-model/pom.xml` + Java sources
- [x] `spec-kafka-client/pom.xml` + Java sources
- [x] `spec-order-producer/pom.xml` + Java sources
- [x] `spec-order-consumer/pom.xml` + Java sources
- [x] `spec-producer-webapp/pom.xml` + Java sources + web.xml
- [x] `spec-consumer-webapp/pom.xml` + Java sources + web.xml

### Configuration Files
- [x] `spec-kafka-client/src/main/resources/kafka.properties`
- [x] `spec-producer-webapp/src/main/resources/struts.xml`
- [x] `spec-producer-webapp/src/main/resources/applicationContext.xml`
- [x] `spec-consumer-webapp/src/main/resources/struts.xml`
- [x] `spec-consumer-webapp/src/main/resources/applicationContext.xml`

### Documentation
- [x] `README.md`
- [x] `QUICK_START.md`
- [x] `PROJECT_STRUCTURE.md`
- [x] `TOMCAT_DEPLOYMENT.md`

### Deployment Scripts
- [x] `deploy-native.sh` (executable)
- [x] `start-services.sh` (executable)
- [x] `stop-services.sh` (executable)
- [x] `test-application.sh` (executable)

### Docker (Optional)
- [x] `docker-compose.yml`

## 📋 Pre-Deployment Checklist

### 1. Prerequisites Installed

```bash
# Check Java
java -version
# Should show Java 11 or higher

# Check Maven
mvn -version
# Should show Maven 3.6+

# Check Tomcat
ls $TOMCAT_HOME
# Should show Tomcat directory

# Check Kafka (if using native)
ls $KAFKA_HOME
# Should show Kafka directory
```

- [ ] Java 11+ installed
- [ ] Maven 3.6+ installed
- [ ] Apache Tomcat 9+ installed
- [ ] Apache Kafka installed (native) OR Docker available
- [ ] TOMCAT_HOME environment variable set
- [ ] KAFKA_HOME environment variable set (if native)

### 2. Environment Variables

Add to `~/.bashrc` or `~/.zshrc`:

```bash
export JAVA_HOME=/path/to/java11
export TOMCAT_HOME=/opt/tomcat
export KAFKA_HOME=/opt/kafka
export PATH=$JAVA_HOME/bin:$KAFKA_HOME/bin:$PATH
```

- [ ] JAVA_HOME set correctly
- [ ] TOMCAT_HOME set correctly
- [ ] KAFKA_HOME set correctly (if native)
- [ ] PATH includes Java and Kafka bins

### 3. Port Availability

Check these ports are available:

```bash
# Check port 8080 (Tomcat)
lsof -i :8080

# Check port 9092 (Kafka)
lsof -i :9092

# Check port 2181 (Zookeeper)
lsof -i :2181
```

- [ ] Port 8080 available (Tomcat)
- [ ] Port 9092 available (Kafka)
- [ ] Port 2181 available (Zookeeper)

## 🚀 Deployment Steps

### Step 1: Start Kafka

**Option A: Using Docker (Recommended for Development)**

```bash
docker-compose up -d
docker-compose ps  # Verify running
```

- [ ] Docker Compose started
- [ ] Kafka container running
- [ ] Zookeeper container running
- [ ] Kafka UI accessible at http://localhost:8090

**Option B: Native Kafka**

```bash
./start-services.sh
# OR manually:
# Terminal 1: $KAFKA_HOME/bin/zookeeper-server-start.sh $KAFKA_HOME/config/zookeeper.properties
# Terminal 2: $KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties
```

- [ ] Zookeeper started
- [ ] Kafka started
- [ ] Kafka responding on localhost:9092

**Verify Kafka:**

```bash
# Test connection
nc -z localhost 9092
# Should succeed

# List topics
$KAFKA_HOME/bin/kafka-topics.sh --list --bootstrap-server localhost:9092
# Should show empty list or existing topics
```

- [ ] Kafka connection successful
- [ ] Can list topics

### Step 2: Build Application

```bash
cd /Users/mcheedhe/Data/techdocs/ds/kafka/play-ground/spec-kafka
mvn clean install
```

- [ ] Build completed successfully
- [ ] No compilation errors
- [ ] `spec-producer.war` created in `spec-producer-webapp/target/`
- [ ] `spec-consumer.war` created in `spec-consumer-webapp/target/`

**Verify WAR files:**

```bash
ls -lh spec-producer-webapp/target/spec-producer.war
ls -lh spec-consumer-webapp/target/spec-consumer.war
```

- [ ] spec-producer.war exists (size > 10MB)
- [ ] spec-consumer.war exists (size > 10MB)

### Step 3: Deploy to Tomcat

**Option A: Using Deployment Script (Recommended)**

```bash
./deploy-native.sh
```

- [ ] Script executed successfully
- [ ] Tomcat restarted
- [ ] WARs deployed

**Option B: Manual Deployment**

```bash
# Stop Tomcat
$TOMCAT_HOME/bin/shutdown.sh

# Clean old deployments
rm -rf $TOMCAT_HOME/webapps/spec-producer*
rm -rf $TOMCAT_HOME/webapps/spec-consumer*

# Copy WARs
cp spec-producer-webapp/target/spec-producer.war $TOMCAT_HOME/webapps/
cp spec-consumer-webapp/target/spec-consumer.war $TOMCAT_HOME/webapps/

# Start Tomcat
$TOMCAT_HOME/bin/startup.sh
```

- [ ] Tomcat stopped cleanly
- [ ] Old deployments removed
- [ ] New WARs copied
- [ ] Tomcat started

**Verify Deployment:**

```bash
# Wait 20 seconds for deployment
sleep 20

# Check deployed directories
ls -l $TOMCAT_HOME/webapps/

# Check logs
tail -f $TOMCAT_HOME/logs/catalina.out
```

- [ ] spec-producer/ directory exists
- [ ] spec-consumer/ directory exists
- [ ] No errors in catalina.out
- [ ] Applications started successfully

### Step 4: Test Endpoints

```bash
# Test producer
curl http://localhost:8080/spec-producer/status

# Test consumer
curl http://localhost:8080/spec-consumer/status
```

- [ ] Producer endpoint responds
- [ ] Consumer endpoint responds
- [ ] Both return JSON with "success" status

**Or use test script:**

```bash
./test-application.sh
```

- [ ] All tests pass

### Step 5: Functional Testing

**Start Consumer:**

```bash
curl http://localhost:8080/spec-consumer/start
# Should return: {"status":"success","consuming":true,...}
```

- [ ] Consumer started successfully
- [ ] Response shows consuming=true

**Start Producer:**

```bash
curl http://localhost:8080/spec-producer/produce
# Should return: {"status":"success","producing":true}
```

- [ ] Producer started successfully
- [ ] Response shows producing=true

**Monitor Logs:**

```bash
tail -f $TOMCAT_HOME/logs/catalina.out
```

Look for:
```
========================================
Consumed Order #1
Order ID: ORD-XXXXXXXX
Customer: John Doe (CUST-XXX)
...
========================================
```

- [ ] Orders appearing in logs
- [ ] No errors in logs
- [ ] Message count increasing

**Check Status:**

```bash
curl http://localhost:8080/spec-consumer/status
# Should show messageCount > 0
```

- [ ] Message count > 0
- [ ] Consumer still running

**Stop Services:**

```bash
curl http://localhost:8080/spec-producer/stop
curl http://localhost:8080/spec-consumer/stop
```

- [ ] Producer stopped
- [ ] Consumer stopped
- [ ] Both respond with success

## 🔍 Verification Checklist

### Web UIs

- [ ] Producer UI loads: http://localhost:8080/spec-producer
- [ ] Consumer UI loads: http://localhost:8080/spec-consumer
- [ ] Both UIs show endpoint documentation

### REST APIs

- [ ] GET /produce - starts producer
- [ ] GET /stop - stops producer (producer)
- [ ] GET /status - returns status (producer)
- [ ] GET /start - starts consumer
- [ ] GET /stop - stops consumer (consumer)
- [ ] GET /status - returns status with count (consumer)
- [ ] GET /reset - resets message count (consumer)

### Kafka Integration

- [ ] Messages appear in Kafka topic
- [ ] Consumer receives messages
- [ ] Serialization format works (JSON or TMF64)
- [ ] No serialization errors

**Verify in Kafka:**

```bash
# View messages
$KAFKA_HOME/bin/kafka-console-consumer.sh \
  --topic orders \
  --from-beginning \
  --bootstrap-server localhost:9092 \
  --max-messages 5
```

- [ ] Messages visible in Kafka
- [ ] Messages are properly formatted

### Kafka UI (if using Docker)

- [ ] Kafka UI accessible: http://localhost:8090
- [ ] Can see 'orders' topic
- [ ] Can see messages in topic
- [ ] Can see consumer group

## 🛠️ Troubleshooting Checklist

If something doesn't work, check:

### Build Issues

- [ ] Java version is 11+
- [ ] Maven version is 3.6+
- [ ] No compilation errors
- [ ] All dependencies downloaded
- [ ] Internet connection available (for first build)

### Kafka Issues

- [ ] Zookeeper is running
- [ ] Kafka is running
- [ ] Port 9092 is not blocked
- [ ] Kafka logs show no errors
- [ ] Topic 'orders' exists or auto-creation enabled

### Tomcat Issues

- [ ] Tomcat is running
- [ ] Port 8080 is not blocked
- [ ] WARs are in webapps directory
- [ ] Deployment directories exist
- [ ] No errors in catalina.out
- [ ] Sufficient memory for Tomcat

### Application Issues

- [ ] kafka.properties has correct bootstrap servers
- [ ] Spring context loads successfully
- [ ] No ClassNotFoundException errors
- [ ] No connection refused errors
- [ ] Serialization format matches on producer/consumer

## 📊 Success Criteria

Your deployment is successful when:

- [x] All services start without errors
- [x] Producer can be started via REST API
- [x] Consumer can be started via REST API
- [x] Orders are produced to Kafka every 2 seconds
- [x] Orders are consumed and logged by consumer
- [x] Message count increases over time
- [x] Services can be stopped via REST API
- [x] No errors in logs

## 🎯 Quick Commands Reference

```bash
# Build
mvn clean install

# Deploy (all-in-one)
./deploy-native.sh

# Start services
./start-services.sh

# Test
./test-application.sh

# Stop services
./stop-services.sh

# View logs
tail -f $TOMCAT_HOME/logs/catalina.out

# Check Kafka messages
$KAFKA_HOME/bin/kafka-console-consumer.sh --topic orders --from-beginning --bootstrap-server localhost:9092 --max-messages 5
```

## 📝 Post-Deployment Notes

After successful deployment:

1. **Save your configuration:**
   - Note your TOMCAT_HOME path
   - Note your KAFKA_HOME path
   - Save any custom kafka.properties changes

2. **Bookmark URLs:**
   - Producer: http://localhost:8080/spec-producer
   - Consumer: http://localhost:8080/spec-consumer
   - Kafka UI: http://localhost:8090 (if using Docker)

3. **Document any issues:**
   - Note any errors encountered
   - Document workarounds applied
   - Update this checklist if needed

## ✅ Final Verification

Run this complete test:

```bash
# 1. Start everything
./start-services.sh
sleep 15

# 2. Deploy
./deploy-native.sh
sleep 20

# 3. Test
./test-application.sh

# 4. Manual verification
curl http://localhost:8080/spec-consumer/start
curl http://localhost:8080/spec-producer/produce
sleep 10
curl http://localhost:8080/spec-consumer/status | grep messageCount

# 5. Cleanup
curl http://localhost:8080/spec-producer/stop
curl http://localhost:8080/spec-consumer/stop
```

If all steps complete successfully, your deployment is ready for use! ✅

## 🎉 Congratulations!

You have successfully deployed the Spec Kafka application natively without Docker/K8s!

For ongoing use:
- Use `start-services.sh` to start all services
- Use `stop-services.sh` to stop all services
- Use `test-application.sh` to verify functionality
- Refer to `TOMCAT_DEPLOYMENT.md` for detailed instructions

