package com.blogfriday.chat.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
public class ChatUserDTO {
	private String user_id;
    private String user_idemail; // 아이디로 사용할 이메일
    private String user_password; // password
    private String user_name; // 실명 저장
    private String user_phonenumber; // 전화번호
    private int user_state = 1; // state 값
    private String user_nickname; // 사이트 내 nickname
    private String user_profile; // 프로필 이미지 파일 경로
    private String user_code; // 사용자 코드
    private MultipartFile profilePicture;
}
