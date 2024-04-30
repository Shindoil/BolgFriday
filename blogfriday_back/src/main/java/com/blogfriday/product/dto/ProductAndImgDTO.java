package com.blogfriday.product.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductAndImgDTO {

	private int product_code, user_id, category_code, product_count;
	private float product_price;
	private String product_name, product_color, product_size, product_content_text;

	// board테이블의 파일 첨부를 처리해주는 멤버변수
	private String product_img0;

	// form페이지에서 파일첨부를 받아 처리해주는 멤버변수
	private MultipartFile filename;
	private MultipartFile secondFile;
	
}
