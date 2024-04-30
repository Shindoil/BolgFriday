package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.PaymentMethodDTO;
import com.blogfriday.payment.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;

    @Autowired
    public PaymentMethodServiceImpl(PaymentMethodRepository paymentMethodRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
    }

    @Override
    @Transactional
    public List<PaymentMethodDTO> getAllPaymentMethods() {
        return paymentMethodRepository.findAll();
    }

    @Override
    @Transactional
    public PaymentMethodDTO getPaymentMethodById(int methodId) {
        return paymentMethodRepository.findById(methodId);
    }

    @Override
    @Transactional
    public void addPaymentMethod(PaymentMethodDTO paymentMethod) {
        paymentMethodRepository.insert(paymentMethod);
    }

    @Override
    @Transactional
    public void updatePaymentMethod(PaymentMethodDTO paymentMethod) {
        paymentMethodRepository.update(paymentMethod);
    }

    @Override
    @Transactional
    public void deletePaymentMethod(int methodId) {
        paymentMethodRepository.delete(methodId);
    }
}