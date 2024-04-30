//// 사용자 관리와 관련된 기능 
 package com.blogfriday.user.service;

import com.blogfriday.user.dto.BlogFridayUserDTO;
import com.blogfriday.user.dto.SignResponse;

import jnr.ffi.Struct.int16_t;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    SignResponse getByUserIdEmail(String userIdEmail);

    SignResponse addUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture);

    BlogFridayUserDTO viewUserProcess(String userIdEmail);

    void deleteUserProcess(String userIdEmail);

    SignResponse updateUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture);
    
    public String generateRandomString(int length);
    
    public void updateUserStateProcess(int user_id);
    
    public String saveProfilePicture(MultipartFile file) throws IOException;
    
    // 프로필 사진에 사용할 난수 발생
    public String generateProfilePictureRandomString(int length);
    
    // 이메일 중복체크
    public boolean isUserExists(String user_idemail);
    
    // 아이디 찾기
    String findIdByEmail(String user_name, String user_phonenumber, String user_findhome, String user_findname);
    
    //비밀번호를 변경하기 위한 인증
    int OkuserBypass(String user_idemail, String user_name, String user_phonenumber, String user_findhome, String user_findname);
    
    //비밀번호 변경
    SignResponse updateUserPass(BlogFridayUserDTO userDTO);
    
}