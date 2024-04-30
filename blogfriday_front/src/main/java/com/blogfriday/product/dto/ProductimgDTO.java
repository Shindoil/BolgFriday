package com.blogfriday.product.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProductimgDTO {

	//board테이블의 파일 첨부를 처리해주는 멤버변수
		private String product_img0,product_img1,product_img2;
		private int product_code;

		//form페이지에서 파일첨부를 받아 처리해주는 멤버변수
		private MultipartFile filename;
		private MultipartFile secondFilename;
	
}
