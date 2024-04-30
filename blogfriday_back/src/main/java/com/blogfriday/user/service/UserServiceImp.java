package com.blogfriday.user.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.blogfriday.chat.controller.WebSocketChatHandler;
import com.blogfriday.chat.dto.ChatDTO;
import com.blogfriday.chat.service.ChatService;
import com.blogfriday.security.jwt.JwtProvider;
import com.blogfriday.user.dto.BlogFridayUserDTO;
import com.blogfriday.user.dto.SignResponse;
import com.blogfriday.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
    private final UserRepository userRepository;
      
    @Value("${app.additional.path}") 
    private String additionalPath;
    
  //규연-회원가입하면 시스템, 나와의 대화계정 친구추가용 서비스
    @Autowired
    private ChatService chatService;
    @Autowired
    private WebSocketChatHandler webSocketChatHandler;

    @Override
    public SignResponse getByUserIdEmail(String userIdEmail) {
        log.info("loadUserByUsername:{}", userIdEmail);
        BlogFridayUserDTO blogfridayDTO = userRepository.selectByEmail(userIdEmail);
        if (blogfridayDTO == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }

        return SignResponse.builder().user_idemail(blogfridayDTO.getUser_idemail())
                .user_name(blogfridayDTO.getUser_name())
                .user_nickname(blogfridayDTO.getUser_nickname())
                .accessToken(JwtProvider.createAccessToken(userIdEmail))
                .refreshToken(JwtProvider.createRefreshToken(userIdEmail)).build();
    }



    @Override
    public SignResponse addUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture) {
        try {
            // 프로필 사진이 업로드되었는지 확인
            if (profilePicture != null && !profilePicture.isEmpty()) {
                // 프로필 사진 저장하고 새로운 파일명 받기
                String newProfilePictureName = saveProfilePicture(profilePicture);

                // 사용자 정보 설정
                dto.setUser_profile(newProfilePictureName); // 새로운 파일명을 user_profile에 설정
            } else {
                // 파일이 업로드되지 않은 경우, 사용자 프로필 사진을 null로 설정
                dto.setUser_profile(null);
            }

            // 7자리의 난수 생성하여 사용자 코드로 설정
            String randomString = generateRandomString(7);
            dto.setUser_code(randomString);

            // 사용자 등록
            userRepository.insertUser(dto);
            
         // chat admin 등록후 친구추가
            ChatDTO systemDTO = new ChatDTO();
            systemDTO.setUser_code1(randomString);
            systemDTO.setUser_code2("A00000");
            chatService.insertFriendProcess(systemDTO);
            webSocketChatHandler.firstJoinMessage(randomString);
            
            // chat mychat 등록후 친구추가
            
            ChatDTO myDTO = new ChatDTO();
            myDTO.setUser_code1(randomString);
            myDTO.setUser_code2("A10000");
            chatService.insertFriendProcess(myDTO);
            
            // chat mychat 등록후 친구추가
            
            ChatDTO shopDTO = new ChatDTO();
            shopDTO.setUser_code1(randomString);
            shopDTO.setUser_code2("A00002");
            chatService.insertFriendProcess(shopDTO);

            // 회원가입 성공 시 응답 반환
            return SignResponse.builder()
                    .user_idemail(dto.getUser_idemail())
                    .user_name(dto.getUser_name())
                    .user_nickname(dto.getUser_nickname())
                    .user_phonenumber(dto.getUser_phonenumber())
                    .user_profile(dto.getUser_profile())
                    .user_findhome(dto.getUser_findhome())
                    .user_findname(dto.getUser_findname())
                    .build(); // password 제외
        } catch (IOException e) {
            // 프로필 사진 저장 실패 시 에러 처리
            log.error("Failed to save profile picture", e);
            // 실패 응답 반환
            return null;
        }
    }

    
    
    
    @Override
    public BlogFridayUserDTO viewUserProcess(String user_idemail) {
        // UserRepository를 통해 사용자 정보 조회
        return userRepository.selectByEmail(user_idemail);
    }

   
    @Override
    public void deleteUserProcess(String userIdEmail) {
        userRepository.deleteUser(userIdEmail);
    }

    
    
    @Override
    public SignResponse updateUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture) {
        try {
            if (profilePicture != null && !profilePicture.isEmpty()) { // 파일이 업로드되었는지 확인
                // 변경하는 프로필 사진 저장하고 새로운 경로 받기
                String newProfilePictureName = saveProfilePicture(profilePicture);

                // 사용자 정보 설정
                dto.setUser_profile(newProfilePictureName); // 새로운 파일명
            } else {
                // 파일이 업로드되지 않은 경우에는 사용자 정보만 업데이트
                dto.setUser_profile(null); // 프로필 사진을 null로 설정
            }

            // 등록
            userRepository.updateUser(dto);

            return SignResponse.builder()
                    .user_idemail(dto.getUser_idemail())
                    .user_name(dto.getUser_name())
                    .user_password(dto.getUser_password())
                    .user_nickname(dto.getUser_nickname())
                    .user_phonenumber(dto.getUser_phonenumber())
                    .user_profile(dto.getUser_profile())
                    .build();
        } catch (IOException e) {
            log.error("파일 업로드 실패: {}", e.getMessage());
            return null;
        }
    }


    @Override
    public String saveProfilePicture(MultipartFile file) throws IOException {
        // 프로필 사진을 저장하고 저장된 파일 이름을 반환하는 메서드

        // 난수 발생
        String profilecode = generateProfilePictureRandomString(3);

        byte[] bytes = file.getBytes();
        String fileName = file.getOriginalFilename();

        // 파일 이름에 프로필 코드와 "profileimg.png"를 조합하여 새로운 파일 이름 생성
        String newFileName = profilecode +"_"+ "profileimg.png";

        
        String finalPath = additionalPath + "/" + newFileName;
        Files.write(Paths.get(finalPath), bytes);
        
        return newFileName; // 새로운 파일 이름 반환
    }


    @Override
    public String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder result = new StringBuilder(length);
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            result.append(characters.charAt(index));
        }

        return result.toString();
    }
    
    @Override
    public void updateUserStateProcess(int user_id) {
       userRepository.updateUserState(user_id); 
       }
    
   
    // 프로필 사진에 대한 난수 발생
    @Override
    public String generateProfilePictureRandomString(int length) {
        String characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder result = new StringBuilder(length);
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            result.append(characters.charAt(index));
        }

        return result.toString();
    }
    
    //이메일 중복체크 하는 부분
    @Override
    public boolean isUserExists(String user_idemail) {
       int count = userRepository.isUserExists(user_idemail);
       return count >0;
    }

    @Override
    public String findIdByEmail(String user_name, String user_phonenumber, String user_findhome, String user_findname) {
        BlogFridayUserDTO userDTO = BlogFridayUserDTO.builder()
                .user_name(user_name)
                .user_phonenumber(user_phonenumber)
                .user_findhome(user_findhome)
                .user_findname(user_findname)
                .build();
        return userRepository.FindID(userDTO);
    }



   @Override
   public int OkuserBypass(String user_idemail, String user_name, String user_phonenumber, String user_findhome,
         String user_findname) {
      // userRepository를 사용하여 인증 로직 수행
        // 예를 들어 userRepository의 메서드를 호출하여 데이터베이스에서 사용자 정보를 조회하고, 인증 결과를 반환
        BlogFridayUserDTO userDTO = new BlogFridayUserDTO();
        userDTO.setUser_idemail(user_idemail);
        userDTO.setUser_name(user_name);
        userDTO.setUser_phonenumber(user_phonenumber);
        userDTO.setUser_findhome(user_findhome);
        userDTO.setUser_findname(user_findname);

        // 예시 코드: userRepository의 Okuser 메서드를 호출하여 인증 수행
        return userRepository.Okuser(userDTO);
    }


   
   
   @Override
   public SignResponse updateUserPass(BlogFridayUserDTO userDTO) {
       // 비밀번호 변경 요청 처리
       userRepository.updateByPass(userDTO);

       // 변경된 정보를 반환
       return SignResponse.builder()
               .user_idemail(userDTO.getUser_idemail())
               .user_password(userDTO.getUser_password())
               .build();
   }

    
    
    
}//end