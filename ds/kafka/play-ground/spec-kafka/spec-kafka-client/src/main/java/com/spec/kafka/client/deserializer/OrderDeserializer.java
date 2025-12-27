package com.spec.kafka.client.deserializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spec.kafka.client.SerializationFormat;
import com.spec.kafka.model.Order;
import org.apache.commons.codec.binary.Base64;
import org.apache.kafka.common.serialization.Deserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * Custom Kafka deserializer for Order objects supporting JSON and TMF64 formats
 */
public class OrderDeserializer implements Deserializer<Order> {
    
    private static final Logger logger = LoggerFactory.getLogger(OrderDeserializer.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private SerializationFormat format = SerializationFormat.JSON;
    
    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        Object formatConfig = configs.get("serialization.format");
        if (formatConfig != null) {
            try {
                format = SerializationFormat.valueOf(formatConfig.toString().toUpperCase());
                logger.info("OrderDeserializer configured with format: {}", format);
            } catch (IllegalArgumentException e) {
                logger.warn("Invalid serialization format: {}, defaulting to JSON", formatConfig);
            }
        }
    }
    
    @Override
    public Order deserialize(String topic, byte[] data) {
        if (data == null) {
            return null;
        }
        
        try {
            String jsonString;
            
            if (format == SerializationFormat.TMF64) {
                // Decode from Base64 (TMF64)
                byte[] decoded = Base64.decodeBase64(data);
                jsonString = new String(decoded, StandardCharsets.UTF_8);
                logger.debug("Deserialized order from TMF64 format");
            } else {
                // Parse as JSON
                jsonString = new String(data, StandardCharsets.UTF_8);
                logger.debug("Deserialized order from JSON format");
            }
            
            return objectMapper.readValue(jsonString, Order.class);
        } catch (Exception e) {
            logger.error("Error deserializing order", e);
            throw new RuntimeException("Failed to deserialize order", e);
        }
    }
    
    @Override
    public void close() {
        // No resources to close
    }
}

