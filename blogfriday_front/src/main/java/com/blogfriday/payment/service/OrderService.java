package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.OrderDTO;
import java.util.List;

public interface OrderService {
    List<OrderDTO> getAllOrders();
    OrderDTO getOrderById(int orderId);
    void addOrder(OrderDTO order);
    void updateOrder(OrderDTO order);
    void deleteOrder(int orderId);
}