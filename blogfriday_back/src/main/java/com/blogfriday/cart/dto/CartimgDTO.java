package com.blogfriday.cart.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartimgDTO {
	private int product_code;
	private int user_id;
	private String product_img0;
	
	//productimg테이블의 파일 첨부를 처리해주는 멤버변수
	private String upload;
//form페이지에서 파일첨부를 받아 처리해주는 멤버변수
	private MultipartFile filename;

}
