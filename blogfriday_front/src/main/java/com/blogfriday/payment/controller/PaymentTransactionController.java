package com.blogfriday.payment.controller;

import com.blogfriday.payment.dto.PaymentTransactionDTO;
import com.blogfriday.payment.service.PaymentTransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/transactions")
public class PaymentTransactionController {

    private final PaymentTransactionService paymentTransactionService;

    @Autowired
    public PaymentTransactionController(PaymentTransactionService paymentTransactionService) {
        this.paymentTransactionService = paymentTransactionService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentTransactionDTO>> getAllTransactions() {
        List<PaymentTransactionDTO> transactions = paymentTransactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<PaymentTransactionDTO> getTransactionById(@PathVariable("transactionId") int transactionId) {
        PaymentTransactionDTO transaction = paymentTransactionService.getTransactionById(transactionId);
        if (transaction == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(transaction);
    }

    @PostMapping
    public ResponseEntity<Void> addTransaction(@Valid @RequestBody PaymentTransactionDTO transaction, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }
        paymentTransactionService.addTransaction(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/createPayment")
    public ResponseEntity<?> createPayment(@Valid @RequestBody PaymentTransactionDTO paymentTransactionDTO, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation error messages here");
        }
        paymentTransactionService.addTransaction(paymentTransactionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Payment processed successfully");
    }

    @PutMapping("/{transactionId}")
    public ResponseEntity<Void> updateTransaction(@Valid @RequestBody PaymentTransactionDTO transaction, @PathVariable("transactionId") int transactionId, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }
        transaction.setTransactionId(transactionId);
        paymentTransactionService.updateTransaction(transaction);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable("transactionId") int transactionId) {
        paymentTransactionService.deleteTransaction(transactionId);
        return ResponseEntity.ok().build();
    }
}