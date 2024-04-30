package com.blogfriday.payment.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@Setter
public class OrderDTO {
    private int orderId;
    private int userId;
    private OffsetDateTime orderDate;
    private String orderAddress;
    private BigDecimal orderAmount;
}