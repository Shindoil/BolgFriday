package com.blogfriday.payment.repository;

import com.blogfriday.payment.dto.PaymentTransactionDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PaymentTransactionRepository {
    List<PaymentTransactionDTO> findAll();
    PaymentTransactionDTO findById(int transactionId);
    void insert(PaymentTransactionDTO paymentTransaction);
    void update(PaymentTransactionDTO paymentTransaction);
    void delete(int transactionId);
}