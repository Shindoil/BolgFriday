package com.blogfriday.payment.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@Setter
public class PayoutDTO {
    private int payoutId;
    private int orderId;
    private BigDecimal amount;
    private OffsetDateTime payoutDate;
}