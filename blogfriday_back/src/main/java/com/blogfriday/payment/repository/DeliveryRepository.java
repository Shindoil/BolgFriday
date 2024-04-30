package com.blogfriday.payment.repository;

import com.blogfriday.payment.dto.DeliveryDTO;



import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DeliveryRepository {
    void insert(DeliveryDTO deliveryDTO);
    DeliveryDTO selectByOrderId(int orderId);
    void update(DeliveryDTO deliveryDTO);
    void delete(int deliveryId);
}