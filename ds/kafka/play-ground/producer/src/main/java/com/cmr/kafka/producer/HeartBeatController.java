package com.cmr.kafka.producer;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/v1/heartbeat")
public class HeartBeatController {

    private final KafkaProducerService kafkaProducerService;

    @Autowired
    public HeartBeatController(KafkaProducerService kafkaProducerService) {
        this.kafkaProducerService = kafkaProducerService;
    }

    @PostMapping
    public ResponseEntity<String> sendHeartBeat(@RequestBody HeartBeat heartBeat) {
        kafkaProducerService.sendHeartBeat(heartBeat);
        return ResponseEntity.ok("HeartBeat message sent successfully");
    }
}
