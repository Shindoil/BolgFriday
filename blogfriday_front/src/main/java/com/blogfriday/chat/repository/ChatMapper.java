package com.blogfriday.chat.repository;

import java.util.List;

import com.blogfriday.chat.dto.ChatDTO;
import com.blogfriday.chat.dto.ChatUserDTO;

import jnr.ffi.Struct.int16_t;

//친구 등록, 중복검사, 삭제, 조회(LIST)
public interface ChatMapper {
	
	public void insertFriend(ChatDTO chatDTO);
	public int checkUserCodeExist(String string);
	public int notSameFriend(ChatDTO chatDTO);
	public void deleteFriend(ChatDTO chatDTO);
	public List<ChatDTO> friendList(String user_code1);
	public List<String> friendListString(String user_code1);
	public List<ChatUserDTO> selectFriendsByUserCode(String user_code1);
	public ChatUserDTO selecthistoryuser(String user_code1);
	
}