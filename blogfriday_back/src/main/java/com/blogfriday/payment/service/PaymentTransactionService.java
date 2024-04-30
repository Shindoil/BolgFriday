package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.PaymentTransactionDTO;

import java.util.List;


public interface PaymentTransactionService {
    List<PaymentTransactionDTO> getAllTransactions();
    PaymentTransactionDTO getTransactionById(int transactionId);
    void addTransaction(PaymentTransactionDTO paymentTransaction);
    void updateTransaction(PaymentTransactionDTO paymentTransaction);
    void deleteTransaction(int transactionId);
}