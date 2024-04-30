package com.blogfriday.payment.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.blogfriday.payment.dto.PaymentTransactionDTO;

@Mapper
public interface PayRepository {

    @Select("SELECT * FROM payment_transactions WHERE method_name = #{methodName}")
    PaymentTransactionDTO findByMethodName(String methodName);
}
