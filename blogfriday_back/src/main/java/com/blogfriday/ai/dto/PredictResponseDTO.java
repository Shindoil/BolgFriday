package com.blogfriday.ai.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PredictResponseDTO {
    private String predictedProductName;
    private String productName;
    private float productPrice;
}