package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.DeliveryDTO;
import com.blogfriday.payment.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryServiceImpl implements DeliveryService {

    private final DeliveryRepository deliveryRepository;

    @Autowired
    public DeliveryServiceImpl(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    @Override
    public void addDelivery(DeliveryDTO deliveryDTO) {
        deliveryRepository.insert(deliveryDTO);
    }

    @Override
    public DeliveryDTO getDeliveryByOrderId(int orderId) {
        return deliveryRepository.selectByOrderId(orderId);
    }
    
    @Override
    public void updateDelivery(DeliveryDTO deliveryDTO) {
        deliveryRepository.update(deliveryDTO);
    }
    
    @Override
    public void deleteDelivery(int deliveryId) {
        deliveryRepository.delete(deliveryId);
    }
}