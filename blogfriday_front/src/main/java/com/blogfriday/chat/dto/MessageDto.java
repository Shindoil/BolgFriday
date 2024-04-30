package com.blogfriday.chat.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;



@Setter
@Getter

@ToString
public class MessageDto {
    private int num;
    private String sender_id;
    private String recipient_id;
    private String message;
    private String timestamp;
    private Boolean is_read;

    
}

