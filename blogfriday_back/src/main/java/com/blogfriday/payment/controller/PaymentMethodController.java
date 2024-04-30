package com.blogfriday.payment.controller;

import com.blogfriday.payment.dto.PaymentMethodDTO;
import com.blogfriday.payment.service.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/paymentMethods")
public class PaymentMethodController {

    private final PaymentMethodService paymentMethodService;

    @Autowired
    public PaymentMethodController(PaymentMethodService paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentMethodDTO>> getAllPaymentMethods() {
        return ResponseEntity.ok(paymentMethodService.getAllPaymentMethods());
    }

    @GetMapping("/{methodId}")
    public ResponseEntity<PaymentMethodDTO> getPaymentMethodById(@PathVariable("methodId") int methodId) {
        PaymentMethodDTO paymentMethod = paymentMethodService.getPaymentMethodById(methodId);
        if (paymentMethod == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(paymentMethod);
    }

    @PostMapping
    public ResponseEntity<Void> addPaymentMethod(@RequestBody PaymentMethodDTO paymentMethod) {
        paymentMethodService.addPaymentMethod(paymentMethod);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{methodId}")
    public ResponseEntity<Void> updatePaymentMethod(@PathVariable("methodId") int methodId, @RequestBody PaymentMethodDTO paymentMethod) {
        paymentMethod.setMethodId(methodId);
        paymentMethodService.updatePaymentMethod(paymentMethod);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{methodId}")
    public ResponseEntity<Void> deletePaymentMethod(@PathVariable("methodId") int methodId) {
        paymentMethodService.deletePaymentMethod(methodId);
        return ResponseEntity.ok().build();
    }
}