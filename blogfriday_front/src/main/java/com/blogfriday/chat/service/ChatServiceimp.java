package com.blogfriday.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogfriday.chat.dto.ChatDTO;
import com.blogfriday.chat.dto.ChatUserDTO;
import com.blogfriday.chat.repository.ChatMapper;

@Service
public class ChatServiceimp implements ChatService{

	@Autowired
	private ChatMapper chatMapper;
	
	@Override
	public void insertFriendProcess(ChatDTO chatDTO) {
		chatMapper.insertFriend(chatDTO);
		
	}
	
	@Override
	public int checkUserCodeExistProcess(String string) {
		return chatMapper.checkUserCodeExist(string);
	}
	
	@Override
	public int notSameFriendProcess(ChatDTO chatDTO) {
		return chatMapper.notSameFriend(chatDTO);
	}

	@Override
	public void deleteFriendProcess(ChatDTO chatDTO) {
		chatMapper.deleteFriend(chatDTO);
		
	}

	@Override
	public List<ChatDTO> friendListProcess(String user_code1) {
		
		return chatMapper.friendList(user_code1);
	}
	
	@Override
	public List<String> friendListStringProcess(String user_code1){
		return chatMapper.friendListString(user_code1);
	}
	
	
	
	@Override
	public List<ChatUserDTO> selectFriendsByUserCodeProcess(String user_code1){
		return chatMapper.selectFriendsByUserCode(user_code1);
	}

	@Override
	public ChatUserDTO selecthistoryuserProcess(String user_code1) {
		return chatMapper.selecthistoryuser(user_code1);
	}
}
