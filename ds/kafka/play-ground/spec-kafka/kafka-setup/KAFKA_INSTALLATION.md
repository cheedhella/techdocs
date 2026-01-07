# Kafka Installation Guide (Optional)

## ⚠️ IMPORTANT NOTE

**The application is already configured to use your production Kafka cluster:**

```
10.253.228.200:9092
```

**You do NOT need to install Kafka locally unless you want to test with a local instance.**

## Current Configuration

The application is configured in `spec-kafka-client/src/main/resources/kafka.properties`:

```properties
kafka.bootstrap.servers=10.253.228.200:9092
kafka.topic.name=orders
kafka.serialization.format=JSON
kafka.consumer.group.id=order-consumer-group
```

## When to Install Local Kafka

Install a local Kafka instance only if you need to:

1. **Development/Testing** - Test without affecting production
2. **Offline Development** - Work without network access to production cluster
3. **Experimentation** - Try different configurations safely

## Option 1: Docker (Recommended for Local Testing)

### Prerequisites
- Docker and Docker Compose installed

### Steps

```bash
cd kafka-setup
docker-compose up -d
```

This will start:
- Zookeeper on `localhost:2181`
- Kafka on `localhost:9092`
- Kafka UI on `http://localhost:8090`

### Update Configuration

Edit `spec-kafka-client/src/main/resources/kafka.properties`:

```properties
# For local testing
kafka.bootstrap.servers=localhost:9092
```

### Stop Local Kafka

```bash
docker-compose down
```

## Option 2: Native Installation

### Prerequisites
- Java 11+
- wget or curl

### Install

```bash
cd kafka-setup
./install-kafka-native.sh
```

This script will:
- Detect your OS (macOS/Linux)
- Download and install Kafka
- Set up in `/opt/kafka` (or use Homebrew on macOS)

### Start Local Kafka

```bash
./start-kafka-native.sh
```

### Stop Local Kafka

```bash
./stop-kafka-native.sh
```

### Update Configuration

Edit `spec-kafka-client/src/main/resources/kafka.properties`:

```properties
# For local testing
kafka.bootstrap.servers=localhost:9092
```

## Option 3: Manual Installation

### macOS

```bash
# Using Homebrew
brew install kafka

# Start services
brew services start zookeeper
brew services start kafka

# Kafka will be available on localhost:9092
```

### Linux

```bash
# Download Kafka
cd /opt
sudo wget https://downloads.apache.org/kafka/3.6.1/kafka_2.13-3.6.1.tgz
sudo tar -xzf kafka_2.13-3.6.1.tgz
sudo ln -s kafka_2.13-3.6.1 kafka

# Start Zookeeper
/opt/kafka/bin/zookeeper-server-start.sh /opt/kafka/config/zookeeper.properties &

# Start Kafka
/opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties &
```

### Windows

1. Download from https://kafka.apache.org/downloads
2. Extract to `C:\kafka`
3. Start Zookeeper:
   ```cmd
   C:\kafka\bin\windows\zookeeper-server-start.bat C:\kafka\config\zookeeper.properties
   ```
4. Start Kafka:
   ```cmd
   C:\kafka\bin\windows\kafka-server-start.bat C:\kafka\config\server.properties
   ```

## Switching Between Local and Production Kafka

### Use Production Kafka (Default)

`spec-kafka-client/src/main/resources/kafka.properties`:
```properties
kafka.bootstrap.servers=10.253.228.200:9092
```

Rebuild and redeploy:
```bash
cd ..
mvn clean install
./deploy-native.sh
```

### Use Local Kafka

`spec-kafka-client/src/main/resources/kafka.properties`:
```properties
kafka.bootstrap.servers=localhost:9092
```

Rebuild and redeploy:
```bash
cd ..
mvn clean install
./deploy-native.sh
```

## Verifying Kafka Connection

### Test Connection

```bash
# For production Kafka
nc -zv 10.253.228.200 9092

# For local Kafka
nc -zv localhost 9092
```

### List Topics

```bash
# Production Kafka
kafka-topics.sh --list --bootstrap-server 10.253.228.200:9092

# Local Kafka
kafka-topics.sh --list --bootstrap-server localhost:9092
```

### Create Topic

```bash
# Production Kafka
kafka-topics.sh --create --topic orders \
  --bootstrap-server 10.253.228.200:9092 \
  --partitions 3 --replication-factor 2

# Local Kafka
kafka-topics.sh --create --topic orders \
  --bootstrap-server localhost:9092 \
  --partitions 3 --replication-factor 1
```

### View Messages

```bash
# Production Kafka
kafka-console-consumer.sh --topic orders \
  --from-beginning \
  --bootstrap-server 10.253.228.200:9092 \
  --max-messages 5

# Local Kafka
kafka-console-consumer.sh --topic orders \
  --from-beginning \
  --bootstrap-server localhost:9092 \
  --max-messages 5
```

## Troubleshooting

### Cannot Connect to Production Kafka

1. **Check network connectivity:**
   ```bash
   ping 10.253.228.200
   telnet 10.253.228.200 9092
   ```

2. **Check firewall rules** - Ensure port 9092 is not blocked

3. **Verify Kafka cluster is running** - Contact your Kafka administrator

4. **Check application logs:**
   ```bash
   tail -f $TOMCAT_HOME/logs/catalina.out
   ```

### Local Kafka Won't Start

1. **Check if ports are available:**
   ```bash
   lsof -i :9092  # Kafka
   lsof -i :2181  # Zookeeper
   ```

2. **Check logs:**
   ```bash
   tail -f /tmp/kafka.log
   tail -f /tmp/zookeeper.log
   ```

3. **Kill existing processes:**
   ```bash
   pkill -f kafka
   pkill -f zookeeper
   ```

## Summary

**For Production Use (Default):**
- ✅ No Kafka installation needed
- ✅ Already configured in kafka.properties
- ✅ Just build and deploy: `./deploy-native.sh`

**For Local Testing:**
- Use Docker: `cd kafka-setup && docker-compose up -d`
- Or use native: `cd kafka-setup && ./install-kafka-native.sh && ./start-kafka-native.sh`
- Update kafka.properties to use `localhost:9092`
- Rebuild and redeploy

**Recommendation:** Use production Kafka cluster for normal operation. Only use local Kafka for development/testing.

