package com.spec.kafka.client.serializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spec.kafka.client.SerializationFormat;
import com.spec.kafka.model.Order;
import org.apache.commons.codec.binary.Base64;
import org.apache.kafka.common.serialization.Serializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * Custom Kafka serializer for Order objects supporting JSON and TMF64 formats
 */
public class OrderSerializer implements Serializer<Order> {
    
    private static final Logger logger = LoggerFactory.getLogger(OrderSerializer.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private SerializationFormat format = SerializationFormat.JSON;
    
    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        Object formatConfig = configs.get("serialization.format");
        if (formatConfig != null) {
            try {
                format = SerializationFormat.valueOf(formatConfig.toString().toUpperCase());
                logger.info("OrderSerializer configured with format: {}", format);
            } catch (IllegalArgumentException e) {
                logger.warn("Invalid serialization format: {}, defaulting to JSON", formatConfig);
            }
        }
    }
    
    @Override
    public byte[] serialize(String topic, Order data) {
        if (data == null) {
            return null;
        }
        
        try {
            String jsonString = objectMapper.writeValueAsString(data);
            
            if (format == SerializationFormat.TMF64) {
                // Encode as Base64 (TMF64)
                byte[] encoded = Base64.encodeBase64(jsonString.getBytes(StandardCharsets.UTF_8));
                logger.debug("Serialized order {} in TMF64 format", data.getOrderId());
                return encoded;
            } else {
                // Return as JSON
                logger.debug("Serialized order {} in JSON format", data.getOrderId());
                return jsonString.getBytes(StandardCharsets.UTF_8);
            }
        } catch (Exception e) {
            logger.error("Error serializing order: {}", data.getOrderId(), e);
            throw new RuntimeException("Failed to serialize order", e);
        }
    }
    
    @Override
    public void close() {
        // No resources to close
    }
}

