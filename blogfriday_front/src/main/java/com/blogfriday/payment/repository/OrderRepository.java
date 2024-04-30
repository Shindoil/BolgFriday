package com.blogfriday.payment.repository;

import com.blogfriday.payment.dto.OrderDTO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface OrderRepository {
    List<OrderDTO> findAll();
    OrderDTO findById(int orderId);
    void insert(OrderDTO order);
    void update(OrderDTO order);
    void delete(int orderId);
}