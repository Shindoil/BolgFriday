package com.blogfriday.user.repository;

import org.apache.ibatis.annotations.Mapper;

import com.blogfriday.user.dto.BlogFridayUserDTO;

import io.lettuce.core.dynamic.annotation.Param;
import jnr.ffi.Struct.int16_t;

@Mapper
public interface UserRepository {
    public int insertUser(BlogFridayUserDTO dto); // 성공하면 1 실패하면 2를 반환
    public BlogFridayUserDTO selectByEmail(String userIdEmail); // 메서드 파라미터 이름 변경
    public void updateUser(BlogFridayUserDTO dto);
    public void deleteUser(String userIdEmail);
    public void updateUserState(int user_id);
    
    //이메일 중복체크
    int isUserExists(String userIdEmail);
    
    //이메일찾기
    String FindID(BlogFridayUserDTO userDTO);

    
    //비밀번호를 찾기 위한 인증
    int Okuser(BlogFridayUserDTO userDTO);
    
    //비밀번호만 변경
    public void updateByPass(BlogFridayUserDTO userDTO);
    
    
    
}//end class