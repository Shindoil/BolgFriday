package com.blogfriday.chat.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogfriday.chat.dto.MessageDto;
import com.blogfriday.chat.repository.MessageMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MessageStoreServiceimp implements MessageStoreService {

	@Autowired
	private MessageMapper messageMapper;
	
	@Override
	public void saveMessage(MessageDto message) {
		log.info("서비스 측에서 제대로 오는지{}",message);
		messageMapper.insertMessage(message);
		
	}

	@Override
	public List<MessageDto> findMessagesByRecipientIdProcess(String recipientId) {
		return messageMapper.findMessagesByRecipientId(recipientId);
	}

	@Override
	public void deleteMessageByDateProcess(String timestamp) {
		messageMapper.deleteMessageByDate(timestamp);
		
	}
	
	@Override
	public void isreadProcess(String recipient_id, String sender_id) {
		Map<String, Object> params = new HashMap<>();
		System.out.println("받는사람 id: " + recipient_id);  // 직접 출력해 보기
	    params.put("recipient_id", recipient_id);
	    System.out.println("보낸사람 id: " + sender_id);    // 직접 출력해 보기
	    params.put("sender_id", sender_id);
	    messageMapper.isread(params);
	}

}
