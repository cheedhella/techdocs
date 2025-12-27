# Project Structure

## Directory Layout

```
spec-kafka/
├── pom.xml (Parent POM)
├── README.md
├── QUICK_START.md
├── PROJECT_STRUCTURE.md
├── .gitignore
├── docker-compose.yml
│
├── spec-model/ (JAR)
│   ├── pom.xml
│   └── src/main/java/com/spec/kafka/model/
│       ├── Order.java
│       └── OrderItem.java
│
├── spec-kafka-client/ (JAR)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/spec/kafka/client/
│       │   ├── SerializationFormat.java
│       │   ├── config/
│       │   │   └── KafkaClientConfig.java
│       │   ├── serializer/
│       │   │   └── OrderSerializer.java
│       │   └── deserializer/
│       │       └── OrderDeserializer.java
│       └── resources/
│           └── kafka.properties
│
├── spec-order-producer/ (JAR)
│   ├── pom.xml
│   └── src/main/java/com/spec/kafka/producer/
│       └── OrderProducerService.java
│
├── spec-order-consumer/ (JAR)
│   ├── pom.xml
│   └── src/main/java/com/spec/kafka/consumer/
│       └── OrderConsumerService.java
│
├── spec-producer-webapp/ (WAR)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/spec/kafka/webapp/producer/action/
│       │   └── ProducerAction.java
│       ├── resources/
│       │   ├── struts.xml
│       │   ├── applicationContext.xml
│       │   ├── kafkaContext.xml
│       │   └── logback.xml
│       └── webapp/
│           ├── WEB-INF/
│           │   └── web.xml
│           └── index.html
│
└── spec-consumer-webapp/ (WAR)
    ├── pom.xml
    └── src/main/
        ├── java/com/spec/kafka/webapp/consumer/action/
        │   └── ConsumerAction.java
        ├── resources/
        │   ├── struts.xml
        │   ├── applicationContext.xml
        │   ├── kafkaContext.xml
        │   └── logback.xml
        └── webapp/
            ├── WEB-INF/
            │   └── web.xml
            └── index.html
```

## Module Dependencies

```
spec-producer-webapp (WAR)
    ├── spec-order-producer
    │   ├── spec-kafka-client
    │   │   └── spec-model
    │   └── spec-model
    └── Spring Kafka + Struts

spec-consumer-webapp (WAR)
    ├── spec-order-consumer
    │   ├── spec-kafka-client
    │   │   └── spec-model
    │   └── spec-model
    └── Spring Kafka + Struts
```

## Key Files

### Configuration Files

| File | Location | Purpose |
|------|----------|---------|
| `pom.xml` | Root | Parent POM with dependency management |
| `kafka.properties` | spec-kafka-client/src/main/resources | Kafka connection settings |
| `struts.xml` | webapp/src/main/resources | Struts action mappings |
| `applicationContext.xml` | webapp/src/main/resources | Spring context configuration |
| `web.xml` | webapp/src/main/webapp/WEB-INF | Web application descriptor |
| `logback.xml` | webapp/src/main/resources | Logging configuration |
| `docker-compose.yml` | Root | Kafka/Zookeeper setup |

### Java Classes

#### Model Layer
- `Order.java` - Order entity with customer info and items
- `OrderItem.java` - Individual order line item

#### Kafka Client Layer
- `SerializationFormat.java` - Enum for JSON/TMF64 formats
- `OrderSerializer.java` - Custom Kafka serializer
- `OrderDeserializer.java` - Custom Kafka deserializer
- `KafkaClientConfig.java` - Spring Kafka configuration

#### Service Layer
- `OrderProducerService.java` - Produces orders to Kafka
- `OrderConsumerService.java` - Consumes orders from Kafka

#### Web Layer
- `ProducerAction.java` - Struts action for producer endpoints
- `ConsumerAction.java` - Struts action for consumer endpoints

## Build Artifacts

After running `mvn clean install`, the following artifacts are generated:

```
target/
├── spec-model-1.0.0-SNAPSHOT.jar
├── spec-kafka-client-1.0.0-SNAPSHOT.jar
├── spec-order-producer-1.0.0-SNAPSHOT.jar
├── spec-order-consumer-1.0.0-SNAPSHOT.jar
├── spec-producer.war
└── spec-consumer.war
```

## Runtime Structure

### Producer Application (spec-producer.war)

```
spec-producer.war
├── WEB-INF/
│   ├── classes/
│   │   ├── com/spec/kafka/
│   │   │   ├── model/
│   │   │   ├── client/
│   │   │   ├── producer/
│   │   │   └── webapp/producer/action/
│   │   ├── struts.xml
│   │   ├── applicationContext.xml
│   │   ├── kafkaContext.xml
│   │   ├── kafka.properties
│   │   └── logback.xml
│   ├── lib/
│   │   ├── spring-*.jar
│   │   ├── kafka-*.jar
│   │   ├── struts2-*.jar
│   │   └── ... (all dependencies)
│   └── web.xml
└── index.html
```

### Consumer Application (spec-consumer.war)

```
spec-consumer.war
├── WEB-INF/
│   ├── classes/
│   │   ├── com/spec/kafka/
│   │   │   ├── model/
│   │   │   ├── client/
│   │   │   ├── consumer/
│   │   │   └── webapp/consumer/action/
│   │   ├── struts.xml
│   │   ├── applicationContext.xml
│   │   ├── kafkaContext.xml
│   │   ├── kafka.properties
│   │   └── logback.xml
│   ├── lib/
│   │   ├── spring-*.jar
│   │   ├── kafka-*.jar
│   │   ├── struts2-*.jar
│   │   └── ... (all dependencies)
│   └── web.xml
└── index.html
```

## Technology Stack by Module

### spec-model
- Java 11
- Jackson (JSON serialization)

### spec-kafka-client
- Spring Framework
- Spring Kafka
- Apache Kafka Clients
- Jackson
- Apache Commons Codec (Base64)

### spec-order-producer
- Spring Framework
- Spring Kafka
- Java Concurrency (ScheduledExecutorService)

### spec-order-consumer
- Spring Framework
- Spring Kafka
- Kafka Listener API

### spec-producer-webapp
- Apache Struts 2
- Spring Framework
- Spring Kafka
- Servlet API

### spec-consumer-webapp
- Apache Struts 2
- Spring Framework
- Spring Kafka
- Servlet API

## Port Usage

| Service | Port | Description |
|---------|------|-------------|
| Kafka | 9092 | Kafka broker |
| Zookeeper | 2181 | Zookeeper coordination |
| Kafka UI | 8090 | Web UI for Kafka |
| Tomcat | 8080 | Application server |
| Producer App | 8080/spec-producer | Producer web app |
| Consumer App | 8080/spec-consumer | Consumer web app |

## Data Flow

```
1. User calls /produce endpoint
   ↓
2. ProducerAction.produce()
   ↓
3. OrderProducerService.startProducing()
   ↓
4. Generate random Order every 2 seconds
   ↓
5. OrderSerializer.serialize() (JSON or TMF64)
   ↓
6. KafkaTemplate.send() → Kafka Topic "orders"
   ↓
7. Kafka stores message
   ↓
8. OrderDeserializer.deserialize() (JSON or TMF64)
   ↓
9. OrderConsumerService.consumeOrder()
   ↓
10. Log order details to console/file
```

## Configuration Flow

```
1. web.xml loads Spring ContextLoaderListener
   ↓
2. applicationContext.xml loaded
   ↓
3. Component scanning: com.spec.kafka
   ↓
4. kafkaContext.xml imported
   ↓
5. kafka.properties loaded
   ↓
6. KafkaClientConfig initialized
   ↓
7. ProducerFactory/ConsumerFactory created
   ↓
8. KafkaTemplate/ListenerContainer created
   ↓
9. Services autowired and ready
   ↓
10. Struts filter intercepts requests
   ↓
11. struts.xml maps URLs to Actions
   ↓
12. Actions call Services
```

## Logging Configuration

### Log Locations
- Console: STDOUT
- File: `logs/spec-producer.log` or `logs/spec-consumer.log`

### Log Levels
- `com.spec.kafka`: INFO
- `org.springframework`: INFO
- `org.apache.kafka`: INFO
- Root: INFO

### Log Format
```
yyyy-MM-dd HH:mm:ss.SSS [thread] LEVEL logger - message
```

## Customization Points

1. **Order Generation**: Modify `OrderProducerService.generateRandomOrder()`
2. **Order Processing**: Modify `OrderConsumerService.consumeOrder()`
3. **Serialization Format**: Change `kafka.serialization.format` in `kafka.properties`
4. **Production Interval**: Change `scheduleAtFixedRate()` interval in `OrderProducerService`
5. **Kafka Settings**: Modify `kafka.properties`
6. **REST Endpoints**: Add actions in `struts.xml` and corresponding methods in Action classes
7. **Logging**: Modify `logback.xml`

## Testing Checklist

- [ ] Build completes successfully: `mvn clean install`
- [ ] WAR files generated in target directories
- [ ] Kafka starts: `docker-compose up -d`
- [ ] WAR files deploy to Tomcat
- [ ] Producer web UI loads: http://localhost:8080/spec-producer
- [ ] Consumer web UI loads: http://localhost:8080/spec-consumer
- [ ] Consumer starts: `curl .../start`
- [ ] Producer starts: `curl .../produce`
- [ ] Orders appear in consumer logs
- [ ] Status endpoints work
- [ ] Stop endpoints work
- [ ] Kafka UI shows messages: http://localhost:8090

