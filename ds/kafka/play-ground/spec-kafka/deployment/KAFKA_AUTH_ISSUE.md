# Kafka Authentication Issue

## Problem

Command-line tools timeout when connecting to Kafka:
```
org.apache.kafka.common.errors.TimeoutException
Caused by: org.apache.kafka.common.errors.DisconnectException
```

But your application connects successfully.

## Root Cause

**Your Kafka cluster likely requires authentication** that:
- ✅ Your application has (configured in `kafka.properties`)
- ❌ Command-line tools don't have (not configured)

## Solution Options

### Option 1: Contact Kafka Administrator (Recommended)

Ask your Kafka administrator for:
1. **Authentication method** (SASL/PLAIN, SASL/SCRAM, SSL, etc.)
2. **Credentials** (username/password or certificates)
3. **Configuration details** (security protocol, SASL mechanism)

### Option 2: Use Application Logs Instead

Since your application can connect, use its logs to verify consumer activity:

```bash
# Watch consumer logs
tail -f /opt/tomcat/logs/spec-consumer.log

# Produce messages
curl -X POST http://localhost:8080/spec-producer/produce

# You should see consumed messages in the log
```

### Option 3: Configure CLI Tools

If you have Kafka credentials, configure them:

1. **Edit `kafka-cli-config.properties`:**
   ```properties
   security.protocol=SASL_PLAINTEXT
   sasl.mechanism=PLAIN
   sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required \
     username="your-username" \
     password="your-password";
   ```

2. **Use with commands:**
   ```bash
   kafka-consumer-groups.sh \
     --bootstrap-server 10.253.228.200:9092 \
     --command-config deployment/kafka-cli-config.properties \
     --describe --group order-consumer-group
   ```

## Verification Without CLI Tools

### 1. Check Application Status
```bash
# Consumer status
curl http://localhost:8080/spec-consumer/status

# Producer status
curl http://localhost:8080/spec-producer/status
```

### 2. Produce Messages
```bash
curl -X POST http://localhost:8080/spec-producer/produce
```

### 3. Check Consumer Logs
```bash
tail -f /opt/tomcat/logs/spec-consumer.log
```

You should see:
```
========================================
Consumed Order #1
Order ID: ORD-xxxxx
Customer: John Doe (CUST-123)
Order Date: 2025-12-27
Total Amount: $150.00
Number of Items: 3
Items:
  - 2 x Product A @ $25.00 = $50.00
  - 1 x Product B @ $50.00 = $50.00
  - 5 x Product C @ $10.00 = $50.00
========================================
```

### 4. Check Producer Logs
```bash
tail -f /opt/tomcat/logs/spec-producer.log
```

You should see:
```
Order produced successfully: ORD-xxxxx
Kafka producer sent message to topic: orders
```

## Why Application Works But CLI Doesn't

Your application configuration (`kafka.properties`) might have:
```properties
# These work for your application
kafka.bootstrap.servers=10.253.228.200:9092

# Possibly also has (but commented out or you haven't seen):
# kafka.security.protocol=SASL_PLAINTEXT
# kafka.sasl.mechanism=PLAIN
# kafka.sasl.jaas.config=...
```

The CLI tools need the same authentication configuration.

## Check Your Application's Kafka Config

Look at your deployed application's configuration:

```bash
# Check if there's authentication configured
grep -i "security\|sasl\|ssl" /opt/tomcat/webapps/spec-consumer/WEB-INF/classes/kafka.properties
grep -i "security\|sasl\|ssl" /opt/tomcat/webapps/spec-producer/WEB-INF/classes/kafka.properties
```

If you see security settings there, use the same for CLI tools.

## Network/Firewall Issues

The timeout could also be:
1. **Firewall blocking CLI tools** but allowing Java applications
2. **Network ACLs** restricting access
3. **Kafka broker configuration** requiring specific client properties

## Recommendation

**For now, use your application to verify everything works:**

1. ✅ Consumer is connected (logs show it)
2. ✅ Producer can send messages
3. ✅ Consumer can receive messages (check logs)
4. ✅ Kafka UI shows consumer group (after first message)

**Contact your Kafka administrator** to get:
- Proper authentication credentials
- CLI configuration
- Network/firewall rules

## Summary

- ✅ **Your application is working correctly**
- ✅ **Consumer is properly configured**
- ❌ **CLI tools need authentication config**
- 📞 **Contact Kafka admin for credentials**

Meanwhile, use application logs and Kafka UI to monitor your consumer! 🎉

