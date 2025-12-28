package com.spec.kafka.webapp.consumer.action;

import com.opensymphony.xwork2.ActionSupport;
import com.spec.kafka.consumer.OrderConsumerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Struts action for consumer REST endpoints
 */
public class ConsumerAction extends ActionSupport {
    
    private static final long serialVersionUID = 1L;
    private static final Logger logger = LoggerFactory.getLogger(ConsumerAction.class);
    
    @Autowired
    private OrderConsumerService orderConsumerService;
    
    private String message;
    private String status;
    private boolean consuming;
    private long messageCount;
    
    /**
     * Start consuming orders - /start endpoint
     */
    public String start() {
        try {
            logger.info("Received request to start consuming orders");
            orderConsumerService.startConsumer();
            
            status = "success";
            message = "Order consumer started successfully";
            consuming = true;
            messageCount = orderConsumerService.getMessageCount();
            
            logger.info("Order consumer started: messageCount: {}", messageCount);
            return SUCCESS;
            
        } catch (Exception e) {
            logger.error("Error starting order consumer", e);
            status = "error";
            message = "Failed to start order consumer: " + e.getMessage();
            consuming = false;
            return ERROR;
        }
    }
    
    /**
     * Stop consuming orders - /stop endpoint
     */
    public String stop() {
        try {
            logger.info("Received request to stop consuming orders");
            orderConsumerService.stopConsumer();
            
            status = "success";
            message = "Order consumer stopped successfully";
            consuming = false;
            messageCount = orderConsumerService.getMessageCount();
            
            logger.info("Order consumer stopped");
            return SUCCESS;
            
        } catch (Exception e) {
            logger.error("Error stopping order consumer", e);
            status = "error";
            message = "Failed to stop order consumer: " + e.getMessage();
            consuming = orderConsumerService.isConsuming();
            return ERROR;
        }
    }
    
    /**
     * Get consumer status - /status endpoint
     */
    public String status() {
        try {
            consuming = orderConsumerService.isConsuming();
            messageCount = orderConsumerService.getMessageCount();
            status = "success";
            message = consuming ? "Consumer is running" : "Consumer is stopped";
            
            logger.info("Consumer status requested: {} (Messages consumed: {})", message, messageCount);
            return SUCCESS;
            
        } catch (Exception e) {
            logger.error("Error getting consumer status", e);
            status = "error";
            message = "Failed to get consumer status: " + e.getMessage();
            return ERROR;
        }
    }
    
    /**
     * Reset message count - /reset endpoint
     */
    public String reset() {
        try {
            logger.info("Received request to reset message count");
            orderConsumerService.resetMessageCount();
            
            status = "success";
            message = "Message count reset successfully";
            consuming = orderConsumerService.isConsuming();
            messageCount = 0;
            
            logger.info("Message count reset");
            return SUCCESS;
            
        } catch (Exception e) {
            logger.error("Error resetting message count", e);
            status = "error";
            message = "Failed to reset message count: " + e.getMessage();
            return ERROR;
        }
    }
    
    // Getters and Setters for JSON response
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public boolean isConsuming() {
        return consuming;
    }
    
    public void setConsuming(boolean consuming) {
        this.consuming = consuming;
    }
    
    public long getMessageCount() {
        return messageCount;
    }
    
    public void setMessageCount(long messageCount) {
        this.messageCount = messageCount;
    }
}

