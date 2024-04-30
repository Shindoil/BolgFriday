package com.blogfriday.chat.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.blogfriday.chat.dto.MessageDto;


@Mapper
public interface MessageMapper {
	public void insertMessage(MessageDto message);
	public List<MessageDto> findMessagesByRecipientId(String recipientId);
	public void deleteMessageByDate(String timestamp);
	
	public void isread(Map<String, Object> params);
}