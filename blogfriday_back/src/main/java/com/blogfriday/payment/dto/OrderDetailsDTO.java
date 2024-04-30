package com.blogfriday.payment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailsDTO {
    private int orderdetailId;
    private int orderId;
    private int productCode;
    private int productQuantity;
    private double priceatPurchase;
}