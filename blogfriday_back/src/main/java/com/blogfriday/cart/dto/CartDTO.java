package com.blogfriday.cart.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

@Component
public class CartDTO {
	private int cart_product_code;//카트 아이디
	private int product_code;//상품정보
	private int cart_product_count;//수량
	private int user_id;//회원정보
}//end class
