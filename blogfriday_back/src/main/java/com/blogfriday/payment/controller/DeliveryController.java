package com.blogfriday.payment.controller;

import com.blogfriday.payment.dto.DeliveryDTO;
import com.blogfriday.payment.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @Autowired
    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @PostMapping
    public void addDelivery(@RequestBody DeliveryDTO deliveryDTO) {
        deliveryService.addDelivery(deliveryDTO);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<DeliveryDTO> getDeliveryByOrderId(@PathVariable("orderId") int orderId) {
        DeliveryDTO deliveryDTO = deliveryService.getDeliveryByOrderId(orderId);
        if (deliveryDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(deliveryDTO);
    }
    
    @PutMapping
    public void updateDelivery(@RequestBody DeliveryDTO deliveryDTO) {
        deliveryService.updateDelivery(deliveryDTO);
    }
    
    @DeleteMapping("/{deliveryId}")
    public void deleteDelivery(@PathVariable("deliveryId") int deliveryId) {
        deliveryService.deleteDelivery(deliveryId);
    }
}