package com.blogfriday.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private int product_code;
    private float product_price;
    private String product_name, product_color, product_size, product_content_text;
}