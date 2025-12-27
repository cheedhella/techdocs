package com.spec.kafka.consumer;

import com.spec.kafka.model.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.listener.MessageListenerContainer;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Service to consume orders from Kafka
 */
@Service
public class OrderConsumerService {
    
    private static final Logger logger = LoggerFactory.getLogger(OrderConsumerService.class);
    private static final String LISTENER_ID = "orderListener";
    
    private final KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry;
    private final AtomicBoolean isConsuming = new AtomicBoolean(false);
    private final AtomicLong messageCount = new AtomicLong(0);
    
    public OrderConsumerService(KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry) {
        this.kafkaListenerEndpointRegistry = kafkaListenerEndpointRegistry;
    }
    
    @PostConstruct
    public void init() {
        // Stop the listener by default on startup
        stopConsumer();
    }
    
    /**
     * Kafka listener for consuming orders
     */
    @KafkaListener(
        id = LISTENER_ID,
        topics = "${kafka.topic.name:orders}",
        containerFactory = "kafkaListenerContainerFactory",
        autoStartup = "false"
    )
    public void consumeOrder(@Payload Order order) {
        if (!isConsuming.get()) {
            return;
        }
        
        try {
            long count = messageCount.incrementAndGet();
            logger.info("========================================");
            logger.info("Consumed Order #{}", count);
            logger.info("Order ID: {}", order.getOrderId());
            logger.info("Customer: {} ({})", order.getCustomerName(), order.getCustomerId());
            logger.info("Order Date: {}", order.getOrderDate());
            logger.info("Status: {}", order.getStatus());
            logger.info("Total Amount: ${}", order.getTotalAmount());
            logger.info("Number of Items: {}", order.getItems().size());
            
            if (!order.getItems().isEmpty()) {
                logger.info("Items:");
                order.getItems().forEach(item -> {
                    logger.info("  - {} x {} @ ${} = ${}",
                        item.getQuantity(),
                        item.getProductName(),
                        item.getUnitPrice(),
                        item.getTotalPrice());
                });
            }
            
            logger.info("========================================");
            
        } catch (Exception e) {
            logger.error("Error processing order: {}", order.getOrderId(), e);
        }
    }
    
    /**
     * Start the consumer listener
     */
    public void startConsumer() {
        if (isConsuming.compareAndSet(false, true)) {
            MessageListenerContainer listenerContainer = 
                kafkaListenerEndpointRegistry.getListenerContainer(LISTENER_ID);
            
            if (listenerContainer != null) {
                if (!listenerContainer.isRunning()) {
                    listenerContainer.start();
                    logger.info("Order consumer listener started");
                } else {
                    logger.info("Order consumer listener is already running");
                }
            } else {
                logger.error("Listener container not found for ID: {}", LISTENER_ID);
                isConsuming.set(false);
            }
        } else {
            logger.warn("Order consumer is already running");
        }
    }
    
    /**
     * Stop the consumer listener
     */
    public void stopConsumer() {
        if (isConsuming.compareAndSet(true, false)) {
            MessageListenerContainer listenerContainer = 
                kafkaListenerEndpointRegistry.getListenerContainer(LISTENER_ID);
            
            if (listenerContainer != null) {
                if (listenerContainer.isRunning()) {
                    listenerContainer.stop();
                    logger.info("Order consumer listener stopped");
                } else {
                    logger.info("Order consumer listener is already stopped");
                }
            } else {
                logger.error("Listener container not found for ID: {}", LISTENER_ID);
            }
        } else {
            logger.warn("Order consumer is not running");
        }
    }
    
    /**
     * Check if consumer is running
     */
    public boolean isConsuming() {
        return isConsuming.get();
    }
    
    /**
     * Get the count of consumed messages
     */
    public long getMessageCount() {
        return messageCount.get();
    }
    
    /**
     * Reset the message count
     */
    public void resetMessageCount() {
        messageCount.set(0);
        logger.info("Message count reset to 0");
    }
}

