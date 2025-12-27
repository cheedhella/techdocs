# Compilation Error Fix

## Problem

When building with Java 11+, you may encounter this error:

```
[ERROR] package javax.annotation does not exist
[ERROR] cannot find symbol: class PostConstruct
```

## Root Cause

Starting with Java 9, the `javax.annotation` package (which includes `@PostConstruct`) was moved out of the core JDK and into a separate module. In Java 11+, it's not included by default.

## Solution Applied

Added the `javax.annotation-api` dependency to the affected modules.

### Files Updated

**1. spec-order-consumer/pom.xml**
**2. spec-order-producer/pom.xml**

Added dependency:
```xml
<!-- Java Annotation API for @PostConstruct -->
<dependency>
    <groupId>javax.annotation</groupId>
    <artifactId>javax.annotation-api</artifactId>
    <version>1.3.2</version>
</dependency>
```

## How to Build

Now you can build successfully:

```bash
mvn clean install
```

Or skip tests for faster build:

```bash
mvn clean install -DskipTests
```

## Verification

After adding the dependency, the compilation should succeed:

```bash
cd /Users/mcheedhe/Data/techdocs/ds/kafka/play-ground/spec-kafka
mvn clean install -DskipTests
```

Expected output:
```
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

## Why This Happened

The `OrderConsumerService.java` uses `@PostConstruct`:

```java
import javax.annotation.PostConstruct;

@PostConstruct
public void init() {
    // Stop the listener by default on startup
    stopConsumer();
}
```

This annotation is part of the Java EE specification, which was removed from Java SE 11+.

## Alternative Solutions

If you don't want to add the dependency, you can:

### Option 1: Remove @PostConstruct (Recommended if issues persist)

**File:** `spec-order-consumer/src/main/java/com/spec/kafka/consumer/OrderConsumerService.java`

Change from:
```java
@PostConstruct
public void init() {
    stopConsumer();
}
```

To:
```java
public OrderConsumerService(KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry) {
    this.kafkaListenerEndpointRegistry = kafkaListenerEndpointRegistry;
    // Stop the listener by default on startup
    stopConsumer();
}
```

### Option 2: Use Spring's @PostConstruct alternative

Use Spring's initialization callback instead:

```java
import org.springframework.beans.factory.InitializingBean;

@Service
public class OrderConsumerService implements InitializingBean {
    
    @Override
    public void afterPropertiesSet() throws Exception {
        stopConsumer();
    }
}
```

## Current Status

✅ **Fix Applied:** Added `javax.annotation-api` dependency to both modules.

✅ **Ready to Build:** Run `mvn clean install` to build the project.

## Next Steps

1. Build the project:
   ```bash
   mvn clean install
   ```

2. If build succeeds, deploy:
   ```bash
   ./deploy-native.sh
   ```

3. If you still have issues, try Option 1 above (remove @PostConstruct).

## Additional Notes

This is a common issue when migrating to Java 11+ from Java 8. The dependency is small (only ~20KB) and widely used, so it's safe to include.

### Dependency Information

- **Group ID:** javax.annotation
- **Artifact ID:** javax.annotation-api
- **Version:** 1.3.2
- **Size:** ~20KB
- **License:** CDDL + GPLv2 with classpath exception

### Affected Annotations

This dependency provides:
- `@PostConstruct`
- `@PreDestroy`
- `@Resource`
- `@Generated`
- `@ManagedBean`
- `@Priority`

Only `@PostConstruct` is used in this project.

