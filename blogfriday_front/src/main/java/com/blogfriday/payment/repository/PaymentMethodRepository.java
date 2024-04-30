package com.blogfriday.payment.repository;

import com.blogfriday.payment.dto.PaymentMethodDTO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface PaymentMethodRepository {
    List<PaymentMethodDTO> findAll();
    PaymentMethodDTO findById(int methodId);
    void insert(PaymentMethodDTO paymentMethod);
    void update(PaymentMethodDTO paymentMethod);
    void delete(int methodId);
}