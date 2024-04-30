package com.blogfriday.payment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentMethodDTO {
    private int methodId;
    private String methodName;
}