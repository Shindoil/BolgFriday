package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.OrderDetailsDTO;
import com.blogfriday.payment.repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailsServiceImpl implements OrderDetailsService {

    private final OrderDetailsRepository orderDetailsRepository;

    @Autowired
    public OrderDetailsServiceImpl(OrderDetailsRepository orderDetailsRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
    }

    @Override
    public List<OrderDetailsDTO> findAll() {
        return orderDetailsRepository.findAll();
    }

    @Override
    public OrderDetailsDTO findById(int orderDetailId) {
        return orderDetailsRepository.findById(orderDetailId);
    }

    @Override
    public void insert(OrderDetailsDTO orderDetail) {
        orderDetailsRepository.insert(orderDetail);
    }

    @Override
    public void update(OrderDetailsDTO orderDetail) {
        orderDetailsRepository.update(orderDetail);
    }

    @Override
    public void delete(int orderDetailId) {
        orderDetailsRepository.delete(orderDetailId);
    }
}