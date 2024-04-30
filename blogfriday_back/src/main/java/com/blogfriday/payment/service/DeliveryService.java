package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.DeliveryDTO;

public interface DeliveryService {
    void addDelivery(DeliveryDTO deliveryDTO);
    DeliveryDTO getDeliveryByOrderId(int orderId);
    void updateDelivery(DeliveryDTO deliveryDTO);
    void deleteDelivery(int deliveryId);
}