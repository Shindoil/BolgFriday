package com.blogfriday.payment.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeliveryDTO {
    private int deliveryId;
    private int orderId;
    private String currentStatus;
    private Date scheduledDeliveryDate;
    private Date actualDeliveryDate;
    private String originalDeliveryAddress;
    private String updatedDeliveryAddress;
    private String trackingNumber;

}