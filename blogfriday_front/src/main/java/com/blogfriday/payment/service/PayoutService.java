package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.PayoutDTO;
import java.util.List;

public interface PayoutService {
    List<PayoutDTO> getAllPayouts();
    PayoutDTO getPayoutById(int payoutId);
    void addPayout(PayoutDTO payout);
    void updatePayout(PayoutDTO payout);
    void deletePayout(int payoutId);
}