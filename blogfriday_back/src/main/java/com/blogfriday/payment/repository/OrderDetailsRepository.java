package com.blogfriday.payment.repository;

import com.blogfriday.payment.dto.OrderDetailsDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository {
    List<OrderDetailsDTO> findAll();
    OrderDetailsDTO findById(int orderDetailId);
    void insert(OrderDetailsDTO orderDetail);
    void update(OrderDetailsDTO orderDetail);
    void delete(int orderDetailId);
}