# Application Configuration

## Kafka Cluster Configuration

### Production Kafka Cluster (Default)

The application is configured to use your production Kafka cluster:

**Brokers:**
- `10.253.228.200:9092`

**Configuration File:**
`spec-kafka-client/src/main/resources/kafka.properties`

```properties
# Kafka Configuration Properties
# Using existing Kafka cluster
kafka.bootstrap.servers=10.253.228.200:9092
kafka.topic.name=orders
kafka.serialization.format=JSON
kafka.consumer.group.id=order-consumer-group
```

### No Kafka Installation Required

✅ **The application is ready to use with your existing Kafka cluster.**

You do NOT need to:
- Install Kafka locally
- Start Kafka services
- Configure Kafka brokers

Just build and deploy:

```bash
mvn clean install
./deploy-native.sh
```

## Optional: Local Kafka for Testing

If you need to test with a local Kafka instance, see the `kafka-setup/` folder:

```bash
cd kafka-setup
# Read the README for options:
# - Docker: docker-compose up -d
# - Native: ./install-kafka-native.sh && ./start-kafka-native.sh
```

Then update `kafka.properties` to use `localhost:9092` and rebuild.

## Configuration Options

### Kafka Bootstrap Servers

**Current (Production):**
```properties
kafka.bootstrap.servers=10.253.228.200:9092
```

**For Local Testing:**
```properties
kafka.bootstrap.servers=localhost:9092
```

### Topic Name

```properties
kafka.topic.name=orders
```

Change this if you want to use a different topic name.

### Serialization Format

```properties
# Options: JSON or TMF64
kafka.serialization.format=JSON
```

**JSON** - Standard JSON format (default, recommended)
**TMF64** - Base64-encoded JSON format

### Consumer Group ID

```properties
kafka.consumer.group.id=order-consumer-group
```

Change this if you want multiple consumer groups.

## Changing Configuration

### 1. Edit Configuration File

```bash
vi spec-kafka-client/src/main/resources/kafka.properties
```

### 2. Rebuild Application

```bash
mvn clean install
```

### 3. Redeploy

```bash
./deploy-native.sh
```

## Verifying Kafka Connectivity

### Check Network Connectivity

```bash
# Test broker
nc -zv 10.253.228.200 9092
```

### List Topics

```bash
kafka-topics.sh --list \
  --bootstrap-server 10.253.228.200:9092
```

### View Messages

```bash
kafka-console-consumer.sh \
  --topic orders \
  --from-beginning \
  --bootstrap-server 10.253.228.200:9092 \
  --max-messages 5
```

### Create Topic (if needed)

```bash
kafka-topics.sh --create \
  --topic orders \
  --bootstrap-server 10.253.228.200:9092 \
  --partitions 3 \
  --replication-factor 2
```

## Tomcat Configuration

### Default Settings

- **Port:** 8080
- **Location:** `$TOMCAT_HOME` (e.g., `/opt/tomcat`)

### Change Tomcat Port

Edit `$TOMCAT_HOME/conf/server.xml`:

```xml
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
```

Change `port="8080"` to desired port.

### JVM Memory Settings

Create/edit `$TOMCAT_HOME/bin/setenv.sh`:

```bash
export CATALINA_OPTS="$CATALINA_OPTS -Xms512m"
export CATALINA_OPTS="$CATALINA_OPTS -Xmx2048m"
```

## Application Settings

### Producer Settings

**Production Interval:** 2 seconds (hardcoded in `OrderProducerService.java`)

To change, edit:
```java
executorService.scheduleAtFixedRate(this::produceOrder, 0, 2, TimeUnit.SECONDS);
//                                                          ^
//                                                    Change this value
```

### Consumer Settings

**Auto Offset Reset:** earliest
**Enable Auto Commit:** true

Configured in `KafkaClientConfig.java`:
```java
props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true);
```

## Logging Configuration

### Log Levels

Edit `logback.xml` in each webapp:

```xml
<logger name="com.spec.kafka" level="INFO"/>
<logger name="org.springframework" level="INFO"/>
<logger name="org.apache.kafka" level="INFO"/>
```

Change `level="INFO"` to `level="DEBUG"` for more detailed logs.

### Log Files

- Producer: `logs/spec-producer.log`
- Consumer: `logs/spec-consumer.log`
- Tomcat: `$TOMCAT_HOME/logs/catalina.out`

## Environment Variables

### Required

```bash
export JAVA_HOME=/path/to/java11
export TOMCAT_HOME=/opt/tomcat
```

### Optional

```bash
# Only if using local Kafka
export KAFKA_HOME=/opt/kafka
```

Add to `~/.bashrc` or `~/.zshrc`:

```bash
# Java
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Tomcat
export TOMCAT_HOME=/opt/tomcat

# Optional: Local Kafka
export KAFKA_HOME=/opt/kafka
export PATH=$KAFKA_HOME/bin:$PATH
```

## Quick Configuration Reference

| Setting | File | Default Value |
|---------|------|---------------|
| Kafka Brokers | kafka.properties | 10.253.228.200:9092 |
| Topic Name | kafka.properties | orders |
| Serialization | kafka.properties | JSON |
| Consumer Group | kafka.properties | order-consumer-group |
| Tomcat Port | server.xml | 8080 |
| Producer Interval | OrderProducerService.java | 2 seconds |
| Log Level | logback.xml | INFO |

## Troubleshooting Configuration

### Cannot Connect to Kafka

1. **Verify network connectivity:**
   ```bash
   ping 10.253.228.200
   telnet 10.253.228.200 9092
   ```

2. **Check firewall rules**

3. **Verify kafka.properties has correct brokers**

4. **Check application logs:**
   ```bash
   tail -f $TOMCAT_HOME/logs/catalina.out | grep -i kafka
   ```

### Serialization Errors

1. **Ensure producer and consumer use same format**
2. **Check kafka.properties:**
   ```properties
   kafka.serialization.format=JSON
   ```
3. **Rebuild after changing format**

### Topic Not Found

1. **Create topic manually:**
   ```bash
   kafka-topics.sh --create --topic orders \
     --bootstrap-server 10.253.228.200:9092 \
     --partitions 3 --replication-factor 2
   ```

2. **Or enable auto-creation in Kafka**

## Summary

✅ **Application is pre-configured for your Kafka cluster**
- Brokers: 10.253.228.200:9092
- Topic: orders
- Format: JSON
- Consumer Group: order-consumer-group

✅ **No Kafka installation needed**

✅ **Just build and deploy:**
```bash
mvn clean install
./deploy-native.sh
```

For local Kafka testing, see `kafka-setup/README.md`

