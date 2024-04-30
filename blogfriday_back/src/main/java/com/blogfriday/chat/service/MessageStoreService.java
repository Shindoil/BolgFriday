package com.blogfriday.chat.service;

import java.util.List;



import com.blogfriday.chat.dto.MessageDto;







public interface MessageStoreService {
    
	 

    // 메세지 저장
	 public void saveMessage(MessageDto message) ;

    // 사용자가 다시 접속했을 때 저장된 메시지를 반환하는 메소드
    public List<MessageDto> findMessagesByRecipientIdProcess(String recipientId) ;
        
    

    // 메시지 전달 후 저장된 메시지를 삭제하는 메소드
    public void deleteMessageByDateProcess(String timestamp) ;

    public void isreadProcess(String recipient_id, String sender_id);
}