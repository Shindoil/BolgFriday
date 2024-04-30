package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.OrderDTO;
import com.blogfriday.payment.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    @Transactional
    public OrderDTO getOrderById(int orderId) {
        return orderRepository.findById(orderId);
    }

    @Override
    @Transactional
    public void addOrder(OrderDTO order) {
        orderRepository.insert(order);
    }

    @Override
    @Transactional
    public void updateOrder(OrderDTO order) {
        orderRepository.update(order);
    }

    @Override
    @Transactional
    public void deleteOrder(int orderId) {
        orderRepository.delete(orderId);
    }
}