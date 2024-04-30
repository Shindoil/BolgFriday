package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.PaymentMethodDTO;
import java.util.List;

public interface PaymentMethodService {
    List<PaymentMethodDTO> getAllPaymentMethods();
    PaymentMethodDTO getPaymentMethodById(int methodId);
    void addPaymentMethod(PaymentMethodDTO paymentMethod);
    void updatePaymentMethod(PaymentMethodDTO paymentMethod);
    void deletePaymentMethod(int methodId);
}