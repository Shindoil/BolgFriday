package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.PayoutDTO;
import com.blogfriday.payment.repository.PayoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PayoutServiceImpl implements PayoutService {

    private final PayoutRepository payoutRepository;

    @Autowired
    public PayoutServiceImpl(PayoutRepository payoutRepository) {
        this.payoutRepository = payoutRepository;
    }

    @Override
    @Transactional
    public List<PayoutDTO> getAllPayouts() {
        return payoutRepository.findAll();
    }

    @Override
    @Transactional
    public PayoutDTO getPayoutById(int payoutId) {
        return payoutRepository.findById(payoutId);
    }

    @Override
    @Transactional
    public void addPayout(PayoutDTO payout) {
        payoutRepository.insert(payout);
    }

    @Override
    @Transactional
    public void updatePayout(PayoutDTO payout) {
        payoutRepository.update(payout);
    }

    @Override
    @Transactional
    public void deletePayout(int payoutId) {
        payoutRepository.delete(payoutId);
    }
}