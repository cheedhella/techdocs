# Kafka Setup (Optional)

**⚠️ NOTE: This folder is OPTIONAL - only use if you need to install/run Kafka locally.**

**The main application is configured to use the existing Kafka cluster:**
- `10.253.228.200:9092`

This folder contains instructions and scripts for setting up Kafka locally if needed for development or testing purposes.

## Current Configuration

The application is already configured to use the production Kafka cluster. See:
- `spec-kafka-client/src/main/resources/kafka.properties`

```properties
kafka.bootstrap.servers=10.253.228.200:9092
```

## When to Use This Folder

Use the scripts in this folder only if you need to:
1. Set up a local Kafka instance for development
2. Test with a local Kafka cluster
3. Run Kafka in an isolated environment

## Contents

- `docker-compose.yml` - Docker-based Kafka setup
- `install-kafka-native.sh` - Install Kafka natively (macOS/Linux)
- `start-kafka-native.sh` - Start native Kafka
- `stop-kafka-native.sh` - Stop native Kafka
- `KAFKA_INSTALLATION.md` - Detailed installation guide

## Quick Local Setup (Docker)

If you need a local Kafka for testing:

```bash
cd kafka-setup
docker-compose up -d
```

Then update `kafka.properties` to use `localhost:9092`.

## Quick Local Setup (Native)

```bash
cd kafka-setup
./install-kafka-native.sh
./start-kafka-native.sh
```

Then update `kafka.properties` to use `localhost:9092`.

## Using Production Kafka (Default)

**No setup needed!** The application is already configured to use the production cluster.

Just deploy the application:

```bash
cd ..
./deploy-native.sh
```

The application will connect to:
- `10.253.228.200:9092`

