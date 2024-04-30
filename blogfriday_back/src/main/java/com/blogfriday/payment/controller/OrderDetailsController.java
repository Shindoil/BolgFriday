package com.blogfriday.payment.controller;

import com.blogfriday.payment.dto.OrderDetailsDTO;
import com.blogfriday.payment.service.OrderDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/orderDetails")
public class OrderDetailsController {

    private final OrderDetailsService orderDetailsService;

    @Autowired
    public OrderDetailsController(OrderDetailsService orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }

    @GetMapping
    public ResponseEntity<List<OrderDetailsDTO>> getAllOrderDetails() {
        return ResponseEntity.ok(orderDetailsService.findAll());
    }

    @GetMapping("/{orderDetailId}")
    public ResponseEntity<OrderDetailsDTO> getOrderDetailById(@PathVariable("orderDetailId") int orderDetailId) {
        OrderDetailsDTO orderDetail = orderDetailsService.findById(orderDetailId);
        if (orderDetail == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orderDetail);
    }

    @PostMapping
    public ResponseEntity<Void> addOrderDetail(@RequestBody OrderDetailsDTO orderDetail) {
        orderDetailsService.insert(orderDetail);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{orderDetailId}")
    public ResponseEntity<Void> updateOrderDetail(@PathVariable("orderDetailId") int orderDetailId, @RequestBody OrderDetailsDTO orderDetail) {
        orderDetail.setOrderdetailId(orderDetailId);
        orderDetailsService.update(orderDetail);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{orderDetailId}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable("orderDetailId") int orderDetailId) {
        orderDetailsService.delete(orderDetailId);
        return ResponseEntity.ok().build();
    }
}