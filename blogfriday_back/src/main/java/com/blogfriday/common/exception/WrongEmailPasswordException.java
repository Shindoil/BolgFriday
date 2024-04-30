package com.blogfriday.common.exception;

public class WrongEmailPasswordException extends RuntimeException{
	
	public WrongEmailPasswordException(String message) {
		super(message);
	}
	

}
