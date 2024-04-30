package com.blogfriday.chat.service;

import java.util.List;

import com.blogfriday.chat.dto.ChatDTO;
import com.blogfriday.chat.dto.ChatUserDTO;

import jnr.ffi.Struct.int16_t;

//친구 등록, 중복검사, 삭제, 조회(LIST)
public interface ChatService {
	
	public void insertFriendProcess(ChatDTO chatDTO);
	public int checkUserCodeExistProcess(String string);
	public int notSameFriendProcess(ChatDTO chatDTO);
	public void deleteFriendProcess(ChatDTO chatDTO);
	public List<ChatDTO> friendListProcess(String user_code1);
	public List<String> friendListStringProcess(String user_code1);
	public List<ChatUserDTO> selectFriendsByUserCodeProcess(String user_code1);
	public ChatUserDTO selecthistoryuserProcess(String user_code1);
}
