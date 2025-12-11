package com.cmr.kafka.producer;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JacksonJsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {

    @Value("${spring.kafka.producer.bootstrap-servers}")
    private String bootstrapServers;

    /*
     * If you define properties under spring.kafka.producer, spring boot can
     * auto-detect the configuration and use them to create ProducerFactory and
     * subsequently KafkaTemplate bean;
     * However, in a spring application(without spring boot), you can define
     * ProducerFactory and KafkaTemplate beans in a @Configuration class;
     */
    @Bean
    public <K, V> ProducerFactory<K, V> createProducerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JacksonJsonSerializer.class);
        // Add more custom producer properties here if needed
        configProps.put(ProducerConfig.ACKS_CONFIG, "all"); // Example of custom property
        configProps.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "snappy"); // Example
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public <K, V> KafkaTemplate<K, V> createKafkaTemplate() { // public KafkaTemplate<String, HeartBeat> kafkaTemplate()
        return new KafkaTemplate<>(createProducerFactory());
    }
}