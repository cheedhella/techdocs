# Quick Start Guide

This guide will help you get the Spec Kafka application up and running quickly.

## Prerequisites

- Java 11+
- Maven 3.6+
- Docker & Docker Compose (for Kafka)
- Apache Tomcat 9+

## Step 1: Start Kafka with Docker

The easiest way to run Kafka is using Docker Compose:

```bash
# Start Kafka, Zookeeper, and Kafka UI
docker-compose up -d

# Verify services are running
docker-compose ps
```

Services:
- Kafka: `localhost:9092`
- Zookeeper: `localhost:2181`
- Kafka UI: `http://localhost:8090`

## Step 2: Build the Project

```bash
# Build all modules
mvn clean install

# This will create:
# - spec-producer-webapp/target/spec-producer.war
# - spec-consumer-webapp/target/spec-consumer.war
```

## Step 3: Deploy to Tomcat

### Option A: Manual Deployment

```bash
# Copy WAR files to Tomcat
cp spec-producer-webapp/target/spec-producer.war $TOMCAT_HOME/webapps/
cp spec-consumer-webapp/target/spec-consumer.war $TOMCAT_HOME/webapps/

# Start Tomcat
$TOMCAT_HOME/bin/startup.sh
```

### Option B: Maven Tomcat Plugin

Add to your `~/.m2/settings.xml`:

```xml
<servers>
  <server>
    <id>TomcatServer</id>
    <username>admin</username>
    <password>admin</password>
  </server>
</servers>
```

Deploy:

```bash
# Deploy producer
cd spec-producer-webapp
mvn tomcat7:deploy

# Deploy consumer
cd ../spec-consumer-webapp
mvn tomcat7:deploy
```

## Step 4: Test the Application

### 1. Open the Web UIs

- Producer: http://localhost:8080/spec-producer
- Consumer: http://localhost:8080/spec-consumer

### 2. Start the Consumer

```bash
curl http://localhost:8080/spec-consumer/start
```

Response:
```json
{
  "status": "success",
  "message": "Order consumer started successfully",
  "consuming": true,
  "messageCount": 0
}
```

### 3. Start the Producer

```bash
curl http://localhost:8080/spec-producer/produce
```

Response:
```json
{
  "status": "success",
  "message": "Order production started successfully",
  "producing": true
}
```

### 4. Monitor the Logs

Watch consumer logs to see orders being processed:

```bash
# If using Tomcat
tail -f $TOMCAT_HOME/logs/catalina.out

# Or check application logs
tail -f logs/spec-consumer.log
```

You should see output like:

```
========================================
Consumed Order #1
Order ID: ORD-A1B2C3D4
Customer: John Doe (CUST-123)
Order Date: 2024-12-26T10:30:00
Status: CONFIRMED
Total Amount: $1250.50
Number of Items: 2
Items:
  - 2 x Laptop @ $500.00 = $1000.00
  - 1 x Mouse @ $250.50 = $250.50
========================================
```

### 5. Check Status

```bash
# Producer status
curl http://localhost:8080/spec-producer/status

# Consumer status
curl http://localhost:8080/spec-consumer/status
```

### 6. View in Kafka UI

Open http://localhost:8090 to see:
- Topics
- Messages
- Consumer groups
- Partitions

## Step 5: Stop Services

```bash
# Stop producer
curl http://localhost:8080/spec-producer/stop

# Stop consumer
curl http://localhost:8080/spec-consumer/stop

# Stop Kafka
docker-compose down
```

## Testing Different Serialization Formats

### Switch to TMF64 (Base64) Format

1. Edit `spec-kafka-client/src/main/resources/kafka.properties`:

```properties
kafka.serialization.format=TMF64
```

2. Rebuild and redeploy:

```bash
mvn clean install
# Redeploy WAR files
```

3. Test again - messages will be Base64 encoded

## Troubleshooting

### Port Already in Use

If port 9092 is already in use:

```bash
# Check what's using the port
lsof -i :9092

# Kill the process or change the port in docker-compose.yml
```

### Cannot Connect to Kafka

```bash
# Check Kafka is running
docker-compose ps

# Check Kafka logs
docker-compose logs kafka

# Restart Kafka
docker-compose restart kafka
```

### WAR Not Deploying

```bash
# Check Tomcat logs
tail -f $TOMCAT_HOME/logs/catalina.out

# Verify WAR file exists
ls -lh spec-producer-webapp/target/spec-producer.war
```

### No Messages Being Consumed

1. Verify producer is running:
   ```bash
   curl http://localhost:8080/spec-producer/status
   ```

2. Verify consumer is running:
   ```bash
   curl http://localhost:8080/spec-consumer/status
   ```

3. Check topic has messages in Kafka UI: http://localhost:8090

4. Verify both use same serialization format

## Next Steps

- Explore the [README.md](README.md) for detailed documentation
- Customize order generation in `OrderProducerService.java`
- Modify consumer processing in `OrderConsumerService.java`
- Add custom endpoints to the Struts actions
- Implement additional Kafka topics

## Useful Commands

```bash
# Build without tests
mvn clean install -DskipTests

# Build specific module
mvn clean install -pl spec-producer-webapp -am

# View Kafka topics
docker exec -it kafka kafka-topics --list --bootstrap-server localhost:9092

# View messages in topic
docker exec -it kafka kafka-console-consumer --topic orders --from-beginning --bootstrap-server localhost:9092

# Create custom topic
docker exec -it kafka kafka-topics --create --topic my-topic --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```

## Support

For issues or questions, check:
1. Application logs in `logs/` directory
2. Tomcat logs in `$TOMCAT_HOME/logs/`
3. Kafka logs: `docker-compose logs kafka`
4. README.md for detailed documentation

