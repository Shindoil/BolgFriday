package com.blogfriday.payment.repository;

import com.blogfriday.payment.dto.PayoutDTO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface PayoutRepository {
    List<PayoutDTO> findAll();
    PayoutDTO findById(int payoutId);
    void insert(PayoutDTO payout);
    void update(PayoutDTO payout);
    void delete(int payoutId);
}