package com.cmr.kafka.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

@Service
@Slf4j
public class KafkaProducerService {

    @Value("${kafka.topic.name}")
    private String topicName;

    private final KafkaTemplate<String, HeartBeat> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, HeartBeat> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendHeartBeat(HeartBeat heartBeat) {
        log.info("Producing heartbeat: {}", heartBeat);
        kafkaTemplate.send(topicName, heartBeat);
    }
}
