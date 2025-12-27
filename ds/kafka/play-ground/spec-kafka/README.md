# Spec Kafka - Multi-Module Maven Application

A comprehensive multi-module Maven application that demonstrates Kafka producer and consumer functionality through web applications built with Apache Struts.

## 📋 Project Overview

This project consists of 6 modules:

1. **spec-model** - Shared model classes (Order, OrderItem)
2. **spec-kafka-client** - Kafka client supporting JSON and TMF64 (Base64) formats
3. **spec-order-producer** - Service module to produce orders
4. **spec-order-consumer** - Service module to consume orders
5. **spec-producer-webapp** - Web application (WAR) with REST API to control producer
6. **spec-consumer-webapp** - Web application (WAR) with REST API to control consumer

## 🏗️ Architecture

```
spec-kafka-parent
├── spec-model (JAR)
├── spec-kafka-client (JAR)
├── spec-order-producer (JAR)
├── spec-order-consumer (JAR)
├── spec-producer-webapp (WAR)
└── spec-consumer-webapp (WAR)
```

## 🔧 Prerequisites

- Java 11 or higher
- Maven 3.6+
- Apache Kafka 3.5+ running on `localhost:9092`
- Apache Tomcat 9+ or any servlet container

## 🚀 Building the Project

Build all modules:

```bash
mvn clean install
```

Build specific module:

```bash
cd spec-producer-webapp
mvn clean package
```

This will generate:
- `spec-producer-webapp/target/spec-producer.war`
- `spec-consumer-webapp/target/spec-consumer.war`

## 📦 Deployment

### Deploy to Tomcat

1. Copy the WAR files to Tomcat's webapps directory:

```bash
cp spec-producer-webapp/target/spec-producer.war $TOMCAT_HOME/webapps/
cp spec-consumer-webapp/target/spec-consumer.war $TOMCAT_HOME/webapps/
```

2. Start Tomcat:

```bash
$TOMCAT_HOME/bin/startup.sh
```

3. Access the applications:
   - Producer: http://localhost:8080/spec-producer
   - Consumer: http://localhost:8080/spec-consumer

## 🔌 API Endpoints

### Producer Application (spec-producer.war)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/produce` | GET | Start producing orders to Kafka (every 2 seconds) |
| `/stop` | GET | Stop producing orders |
| `/status` | GET | Get producer status |

**Example Usage:**

```bash
# Start producing
curl http://localhost:8080/spec-producer/produce

# Stop producing
curl http://localhost:8080/spec-producer/stop

# Check status
curl http://localhost:8080/spec-producer/status
```

**Response Format:**

```json
{
  "status": "success",
  "message": "Order production started successfully",
  "producing": true
}
```

### Consumer Application (spec-consumer.war)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/start` | GET | Start the consumer listener |
| `/stop` | GET | Stop the consumer listener |
| `/status` | GET | Get consumer status and message count |
| `/reset` | GET | Reset the message count |

**Example Usage:**

```bash
# Start consumer
curl http://localhost:8080/spec-consumer/start

# Stop consumer
curl http://localhost:8080/spec-consumer/stop

# Check status
curl http://localhost:8080/spec-consumer/status

# Reset count
curl http://localhost:8080/spec-consumer/reset
```

**Response Format:**

```json
{
  "status": "success",
  "message": "Order consumer started successfully",
  "consuming": true,
  "messageCount": 42
}
```

## ⚙️ Configuration

### Kafka Configuration

Edit `spec-kafka-client/src/main/resources/kafka.properties`:

```properties
kafka.bootstrap.servers=localhost:9092
kafka.topic.name=orders
kafka.serialization.format=JSON
kafka.consumer.group.id=order-consumer-group
```

### Serialization Formats

The application supports two serialization formats:

1. **JSON** - Standard JSON format (default)
2. **TMF64** - Base64 encoded JSON format

To change the format, update `kafka.serialization.format` in `kafka.properties`:

```properties
# For JSON format
kafka.serialization.format=JSON

# For TMF64 (Base64) format
kafka.serialization.format=TMF64
```

## 📊 Order Data Model

### Order

```json
{
  "orderId": "ORD-12345678",
  "customerId": "CUST-123",
  "customerName": "John Doe",
  "orderDate": "2024-12-26T10:30:00",
  "totalAmount": 1250.50,
  "status": "CONFIRMED",
  "items": [...]
}
```

### OrderItem

```json
{
  "itemId": "ITEM-1",
  "productName": "Laptop",
  "quantity": 2,
  "unitPrice": 500.00,
  "totalPrice": 1000.00
}
```

## 📝 Logging

Logs are written to:
- Producer: `logs/spec-producer.log`
- Consumer: `logs/spec-consumer.log`

Consumer logs show detailed information about each consumed order:

```
========================================
Consumed Order #42
Order ID: ORD-12345678
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

## 🧪 Testing the Application

### 1. Start Kafka

```bash
# Start Zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties

# Start Kafka
bin/kafka-server-start.sh config/server.properties

# Create topic (optional - will be auto-created)
bin/kafka-topics.sh --create --topic orders --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```

### 2. Deploy Applications

Deploy both WAR files to Tomcat as described above.

### 3. Start Consumer

```bash
curl http://localhost:8080/spec-consumer/start
```

### 4. Start Producer

```bash
curl http://localhost:8080/spec-producer/produce
```

### 5. Monitor Logs

Watch the consumer logs to see orders being consumed:

```bash
tail -f logs/spec-consumer.log
```

### 6. Stop Services

```bash
# Stop producer
curl http://localhost:8080/spec-producer/stop

# Stop consumer
curl http://localhost:8080/spec-consumer/stop
```

## 🛠️ Technology Stack

- **Java 11**
- **Apache Maven** - Build and dependency management
- **Apache Struts 2.6.3** - Web framework and REST API
- **Spring Framework 5.3.30** - Dependency injection
- **Spring Kafka 2.9.11** - Kafka integration
- **Apache Kafka 3.5.1** - Message broker
- **Jackson 2.15.3** - JSON serialization
- **Logback 1.2.12** - Logging
- **Apache Commons Codec** - Base64 encoding/decoding

## 📂 Module Details

### spec-model
Contains shared domain models:
- `Order.java` - Order entity with customer and order details
- `OrderItem.java` - Individual items in an order

### spec-kafka-client
Kafka client infrastructure:
- `OrderSerializer.java` - Custom serializer supporting JSON/TMF64
- `OrderDeserializer.java` - Custom deserializer supporting JSON/TMF64
- `KafkaClientConfig.java` - Spring Kafka configuration
- `SerializationFormat.java` - Enum for serialization formats

### spec-order-producer
Producer service:
- `OrderProducerService.java` - Generates and sends orders to Kafka
- Produces random orders every 2 seconds
- Thread-safe start/stop control

### spec-order-consumer
Consumer service:
- `OrderConsumerService.java` - Consumes orders from Kafka
- Logs detailed order information
- Tracks message count
- Thread-safe start/stop control

### spec-producer-webapp
Struts web application:
- `ProducerAction.java` - REST endpoints for producer control
- Exposes `/produce`, `/stop`, `/status` endpoints
- Returns JSON responses

### spec-consumer-webapp
Struts web application:
- `ConsumerAction.java` - REST endpoints for consumer control
- Exposes `/start`, `/stop`, `/status`, `/reset` endpoints
- Returns JSON responses with message count

## 🔍 Troubleshooting

### Kafka Connection Issues

If you see connection errors, verify:
1. Kafka is running on `localhost:9092`
2. Topic `orders` exists or auto-creation is enabled
3. Firewall allows connections to port 9092

### Serialization Errors

If you see serialization errors:
1. Ensure both producer and consumer use the same format (JSON or TMF64)
2. Check `kafka.properties` configuration
3. Verify Jackson dependencies are present

### Consumer Not Receiving Messages

1. Check consumer group ID - different groups will receive all messages
2. Verify consumer is started: `curl http://localhost:8080/spec-consumer/status`
3. Check Kafka topic has messages: `bin/kafka-console-consumer.sh --topic orders --from-beginning --bootstrap-server localhost:9092`

## 📄 License

This project is provided as-is for educational and demonstration purposes.

## 👥 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

For questions or issues, please check the logs in the `logs/` directory for detailed error information.

