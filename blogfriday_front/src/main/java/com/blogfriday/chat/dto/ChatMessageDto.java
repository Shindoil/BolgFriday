package com.blogfriday.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString 
public class ChatMessageDto {
	
	// 추후 다중 채팅방을 위해서
//    public enum MessageType {
//        ENTER, TALK, LEAVE
//    }
//
//    private MessageType messageType; // 메시지 타입
	
	
    private String sender_id; // 채팅을 보낸 사람
    private String message; // 메시지 내용
    private String recipient_id; // 수신자 ID
    private String timestamp;
    private Boolean is_read;
}
