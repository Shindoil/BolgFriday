package com.blogfriday.payment.controller;

import com.blogfriday.payment.dto.PayoutDTO;
import com.blogfriday.payment.service.PayoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/payouts")
public class PayoutController {

    private final PayoutService payoutService;

    @Autowired
    public PayoutController(PayoutService payoutService) {
        this.payoutService = payoutService;
    }

    @GetMapping
    public ResponseEntity<List<PayoutDTO>> getAllPayouts() {
        return ResponseEntity.ok(payoutService.getAllPayouts());
    }

    @GetMapping("/{payoutId}")
    public ResponseEntity<PayoutDTO> getPayoutById(@PathVariable("payoutId") int payoutId) {
        PayoutDTO payout = payoutService.getPayoutById(payoutId);
        if (payout == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(payout);
    }

    @PostMapping
    public ResponseEntity<Void> addPayout(@RequestBody PayoutDTO payout) {
        payoutService.addPayout(payout);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{payoutId}")
    public ResponseEntity<Void> updatePayout(@PathVariable("payoutId") int payoutId, @RequestBody PayoutDTO payout) {
        payout.setPayoutId(payoutId);
        payoutService.updatePayout(payout);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{payoutId}")
    public ResponseEntity<Void> deletePayout(@PathVariable("payoutId") int payoutId) {
        payoutService.deletePayout(payoutId);
        return ResponseEntity.ok().build();
    }
}