package com.blogfriday.payment.service;

import com.blogfriday.payment.dto.PaymentTransactionDTO;
import com.blogfriday.payment.repository.PaymentTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PaymentTransactionServiceImp implements PaymentTransactionService {

    private final PaymentTransactionRepository paymentTransactionRepository;

    @Autowired
    public PaymentTransactionServiceImp(PaymentTransactionRepository paymentTransactionRepository) {
        this.paymentTransactionRepository = paymentTransactionRepository;
    }

    @Override
    @Transactional
    public List<PaymentTransactionDTO> getAllTransactions() {
        return paymentTransactionRepository.findAll();
    }

    @Override
    @Transactional
    public PaymentTransactionDTO getTransactionById(int transactionId) {
        return paymentTransactionRepository.findById(transactionId);
    }

    @Override
    @Transactional
    public void addTransaction(PaymentTransactionDTO paymentTransaction) {
        paymentTransactionRepository.insert(paymentTransaction);
    }

    @Override
    @Transactional
    public void updateTransaction(PaymentTransactionDTO paymentTransaction) {
        paymentTransactionRepository.update(paymentTransaction);
    }

    @Override
    @Transactional
    public void deleteTransaction(int transactionId) {
        paymentTransactionRepository.delete(transactionId);
    }
}