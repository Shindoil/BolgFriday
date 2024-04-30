package com.blogfriday.product.dto;

import jnr.ffi.Struct.int16_t;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProducthistoryDTO {
		private int history_code,product_code,user_id1,user_id2,category_code,product_count;
		private float product_price;
		private String product_name,user_code1,user_code2,timestamp;
}
