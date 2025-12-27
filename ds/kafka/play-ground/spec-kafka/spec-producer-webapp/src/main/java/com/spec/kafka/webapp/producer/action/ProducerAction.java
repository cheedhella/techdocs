package com.spec.kafka.webapp.producer.action;

import com.opensymphony.xwork2.ActionSupport;
import com.spec.kafka.producer.OrderProducerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Struts action for producer REST endpoints
 */
public class ProducerAction extends ActionSupport {
    
    private static final long serialVersionUID = 1L;
    private static final Logger logger = LoggerFactory.getLogger(ProducerAction.class);
    
    @Autowired
    private OrderProducerService orderProducerService;
    
    private String message;
    private String status;
    private boolean producing;
    
    /**
     * Start producing orders - /produce endpoint
     */
    public String produce() {
        try {
            logger.info("Received request to start producing orders");
            orderProducerService.startProducing();
            
            status = "success";
            message = "Order production started successfully";
            producing = true;
            
            logger.info("Order production started");
            return SUCCESS;
            
        } catch (Exception e) {
            logger.error("Error starting order production", e);
            status = "error";
            message = "Failed to start order production: " + e.getMessage();
            producing = false;
            return ERROR;
        }
    }
    
    /**
     * Stop producing orders - /stop endpoint
     */
    public String stop() {
        try {
            logger.info("Received request to stop producing orders");
            orderProducerService.stopProducing();
            
            status = "success";
            message = "Order production stopped successfully";
            producing = false;
            
            logger.info("Order production stopped");
            return SUCCESS;
            
        } catch (Exception e) {
            logger.error("Error stopping order production", e);
            status = "error";
            message = "Failed to stop order production: " + e.getMessage();
            producing = orderProducerService.isProducing();
            return ERROR;
        }
    }
    
    /**
     * Get producer status - /status endpoint
     */
    public String status() {
        try {
            producing = orderProducerService.isProducing();
            status = "success";
            message = producing ? "Producer is running" : "Producer is stopped";
            
            logger.info("Producer status requested: {}", message);
            return SUCCESS;
            
        } catch (Exception e) {
            logger.error("Error getting producer status", e);
            status = "error";
            message = "Failed to get producer status: " + e.getMessage();
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
    
    public boolean isProducing() {
        return producing;
    }
    
    public void setProducing(boolean producing) {
        this.producing = producing;
    }
}

