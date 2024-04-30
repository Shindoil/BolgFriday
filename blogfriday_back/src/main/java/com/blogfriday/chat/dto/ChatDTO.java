package com.blogfriday.chat.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ChatDTO {
	
	private int num;
	private String user_code1;
	private String user_code2;
	private Date timestamp;
}
