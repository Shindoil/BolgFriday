package com.blogfriday.payment.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class PaymentTransactionDTO {
	
	private int transactionId;

	private int methodId;
	
	private OffsetDateTime transactionDate;


	private boolean isSuccessful;

	@NotNull(message = "orderId cannot be null")
	private Integer orderId;

	@NotNull(message = "amount 는 null값이 될수 없음")
	@Min(value = 0, message = "amount는 무조건 0보다 커야함")
	private BigDecimal amount;
}
