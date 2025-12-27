package com.spec.kafka.producer;

import com.spec.kafka.model.Order;
import com.spec.kafka.model.OrderItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Service to produce orders to Kafka
 */
@Service
public class OrderProducerService {
    
    private static final Logger logger = LoggerFactory.getLogger(OrderProducerService.class);
    
    @Autowired
    private KafkaTemplate<String, Order> kafkaTemplate;
    
    @Value("${kafka.topic.name:orders}")
    private String topicName;
    
    private final ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
    private final AtomicBoolean isProducing = new AtomicBoolean(false);
    private final Random random = new Random();
    
    private static final String[] CUSTOMER_NAMES = {
        "John Doe", "Jane Smith", "Bob Johnson", "Alice Williams", 
        "Charlie Brown", "Diana Prince", "Eve Adams", "Frank Castle"
    };
    
    private static final String[] PRODUCT_NAMES = {
        "Laptop", "Smartphone", "Tablet", "Headphones", "Keyboard", 
        "Mouse", "Monitor", "Webcam", "Speaker", "Charger"
    };
    
    private static final String[] ORDER_STATUSES = {
        "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"
    };
    
    /**
     * Start producing orders at regular intervals
     */
    public void startProducing() {
        if (isProducing.compareAndSet(false, true)) {
            logger.info("Starting order production to topic: {}", topicName);
            executorService.scheduleAtFixedRate(this::produceOrder, 0, 2, TimeUnit.SECONDS);
        } else {
            logger.warn("Order production is already running");
        }
    }
    
    /**
     * Stop producing orders
     */
    public void stopProducing() {
        if (isProducing.compareAndSet(true, false)) {
            logger.info("Stopping order production");
        } else {
            logger.warn("Order production is not running");
        }
    }
    
    /**
     * Check if currently producing
     */
    public boolean isProducing() {
        return isProducing.get();
    }
    
    /**
     * Produce a single order
     */
    public void produceOrder() {
        if (!isProducing.get()) {
            return;
        }
        
        try {
            Order order = generateRandomOrder();
            sendOrder(order);
        } catch (Exception e) {
            logger.error("Error producing order", e);
        }
    }
    
    /**
     * Send order to Kafka
     */
    public void sendOrder(Order order) {
        ListenableFuture<SendResult<String, Order>> future = 
            kafkaTemplate.send(topicName, order.getOrderId(), order);
        
        future.addCallback(new ListenableFutureCallback<SendResult<String, Order>>() {
            @Override
            public void onSuccess(SendResult<String, Order> result) {
                logger.info("Successfully sent order: {} to partition: {} with offset: {}",
                    order.getOrderId(),
                    result.getRecordMetadata().partition(),
                    result.getRecordMetadata().offset());
            }
            
            @Override
            public void onFailure(Throwable ex) {
                logger.error("Failed to send order: {}", order.getOrderId(), ex);
            }
        });
    }
    
    /**
     * Generate a random order
     */
    private Order generateRandomOrder() {
        String orderId = "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String customerId = "CUST-" + (random.nextInt(1000) + 1);
        String customerName = CUSTOMER_NAMES[random.nextInt(CUSTOMER_NAMES.length)];
        String orderDate = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        String status = ORDER_STATUSES[random.nextInt(ORDER_STATUSES.length)];
        
        Order order = new Order(orderId, customerId, customerName, orderDate, BigDecimal.ZERO, status);
        
        // Add random number of items (1-5)
        int numItems = random.nextInt(5) + 1;
        BigDecimal totalAmount = BigDecimal.ZERO;
        
        for (int i = 0; i < numItems; i++) {
            OrderItem item = generateRandomOrderItem(i + 1);
            order.addItem(item);
            totalAmount = totalAmount.add(item.getTotalPrice());
        }
        
        order.setTotalAmount(totalAmount);
        
        return order;
    }
    
    /**
     * Generate a random order item
     */
    private OrderItem generateRandomOrderItem(int itemNumber) {
        String itemId = "ITEM-" + itemNumber;
        String productName = PRODUCT_NAMES[random.nextInt(PRODUCT_NAMES.length)];
        int quantity = random.nextInt(5) + 1;
        BigDecimal unitPrice = BigDecimal.valueOf(random.nextInt(500) + 10);
        BigDecimal totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));
        
        return new OrderItem(itemId, productName, quantity, unitPrice, totalPrice);
    }
    
    /**
     * Shutdown the executor service
     */
    public void shutdown() {
        logger.info("Shutting down order producer service");
        isProducing.set(false);
        executorService.shutdown();
        try {
            if (!executorService.awaitTermination(5, TimeUnit.SECONDS)) {
                executorService.shutdownNow();
            }
        } catch (InterruptedException e) {
            executorService.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
}

