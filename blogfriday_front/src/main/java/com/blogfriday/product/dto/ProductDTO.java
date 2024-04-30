package com.blogfriday.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private int product_code, user_id, category_code, product_count;
    private float product_price;
    private String product_name, product_color, product_size, product_content_text,timestamp;
}