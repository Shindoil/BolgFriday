package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.OrderDetailsDTO;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


public interface OrderDetailsService {
    List<OrderDetailsDTO> findAll();
    OrderDetailsDTO findById(int orderDetailId);
    void insert(OrderDetailsDTO orderDetail);
    void update(OrderDetailsDTO orderDetail);
    void delete(int orderDetailId);
}