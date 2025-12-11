package com.cmr.kafka.producer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HeartBeat {
    private String productName;
    private String hostName;
    private String precedence;
    private long timestamp;
}
