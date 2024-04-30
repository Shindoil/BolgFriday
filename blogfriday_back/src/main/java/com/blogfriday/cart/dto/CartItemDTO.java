package com.blogfriday.cart.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

@Component
public class CartItemDTO {
    int cart_product_code;
    int product_code; 
    int cart_product_count;
    int user_id;
    private float product_price;
    private String product_name, product_color, product_size, product_content_text;
    private String product_img0,product_img1, product_img2;
   
}