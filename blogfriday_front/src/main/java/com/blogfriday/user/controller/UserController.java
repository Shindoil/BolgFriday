package com.blogfriday.user.controller;

import com.blogfriday.common.exception.WrongEmailPasswordException;
import com.blogfriday.redis.TokenService;
import com.blogfriday.security.jwt.JwtProperties;
import com.blogfriday.security.jwt.JwtProvider;
import com.blogfriday.user.dto.BlogFridayUserDTO;
import com.blogfriday.user.dto.SignResponse;
import com.blogfriday.user.repository.UserRepository;
import com.blogfriday.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
@Tag(name = "blogfriday User", description = "사용자 관련 API")
public class UserController {

   @Value("${app.additional.path}")
   private String additionalPath;

   private final UserService userService;
   private final TokenService tokenService;
   private final PasswordEncoder passwordEncoder;

   @PostMapping("/user/signup")
   public ResponseEntity<SignResponse> addUser(
         @RequestParam(value = "user_profile", required = false) MultipartFile profilePicture,
         @RequestParam("user_idemail") String user_idemail, @RequestParam("user_password") String user_password,
         @RequestParam("user_name") String user_name, @RequestParam("user_phonenumber") String user_phonenumber,
         @RequestParam("user_nickname") String user_nickname, @RequestParam("user_findhome") String user_findhome,
         @RequestParam("user_findname") String user_findname) throws IOException {
      log.info("로그인 요청 들어온다~!");

      // 중복체크하는 부분
      if (userService.isUserExists(user_idemail)) {
         return ResponseEntity.badRequest().build();
      }

      // 사용자 정보 설정
      BlogFridayUserDTO blogFridayUserDTO = new BlogFridayUserDTO();
      blogFridayUserDTO.setUser_idemail(user_idemail);
      blogFridayUserDTO.setUser_password(passwordEncoder.encode(user_password));
      blogFridayUserDTO.setUser_name(user_name);
      blogFridayUserDTO.setUser_phonenumber(user_phonenumber);
      blogFridayUserDTO.setUser_nickname(user_nickname);
      blogFridayUserDTO.setUser_findhome(user_findhome);
      blogFridayUserDTO.setUser_findname(user_findname);

      // 사용자 등록
      SignResponse authInfo;
      if (profilePicture != null && !profilePicture.isEmpty()) {
         authInfo = userService.addUserProcess(blogFridayUserDTO, profilePicture);
      } else {
         // 파일이 업로드되지 않은 경우, 사용자 정보만으로 등록 처리
         authInfo = userService.addUserProcess(blogFridayUserDTO, null);
      }
      return ResponseEntity.ok(authInfo);
   }

   // 로그인
   @Operation(summary = "로그인하기", description = "로그인 API")
   @PostMapping(value = "/user/login")
   public ResponseEntity<SignResponse> signin(@RequestBody BlogFridayUserDTO blogFridayUserDTO) throws Exception {
      // 입력된 이메일에 해당하는 사용자 정보 조회
      BlogFridayUserDTO user = userService.viewUserProcess(blogFridayUserDTO.getUser_idemail());

      // 사용자 정보가 존재하고, 입력된 비밀번호를 암호화하여 사용자의 비밀번호와 비교
      if (user != null && passwordEncoder.matches(blogFridayUserDTO.getUser_password(), user.getUser_password())) {
         // Access Token 및 Refresh Token 생성
         String accessToken = JwtProperties.TOKEN_PREFIX + JwtProvider.createAccessToken(user.getUser_idemail());
         String refreshToken = JwtProvider.createRefreshToken(user.getUser_idemail());
         log.info("accessToken: {}", accessToken);
         log.info("refreshToken: {}", refreshToken);

         // 토큰 저장
         tokenService.saveTokens(user.getUser_idemail(), accessToken, refreshToken);

         // 응답 생성 (토큰과 함께 사용자 정보 반환)
         SignResponse signResponse = SignResponse.builder().user_idemail(user.getUser_idemail())
               .user_name(user.getUser_name()).user_code(user.getUser_code())
               .user_id(user.getUser_id())
               .user_nickname(user.getUser_nickname())
               .user_state(user.getUser_state()).user_profile(user.getUser_profile()).accessToken(accessToken).refreshToken(refreshToken).build();

         return ResponseEntity.ok(signResponse);
      } else {
         // 사용자 정보가 존재하지 않거나 비밀번호가 일치하지 않는 경우 예외 처리
         throw new WrongEmailPasswordException("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
   }

   //비밀번호 확인
   @PostMapping("/checkpass")
   public ResponseEntity<SignResponse> checkpass(@RequestBody BlogFridayUserDTO blogFridayUserDTO) throws Exception {
      log.info("아이디 넘어옴?:{}",blogFridayUserDTO.getUser_idemail());
         // 입력된 이메일에 해당하는 사용자 정보 조회
         BlogFridayUserDTO user = userService.viewUserProcess(blogFridayUserDTO.getUser_idemail());

         // 사용자 정보가 존재하고, 입력된 비밀번호를 암호화하여 사용자의 비밀번호와 비교
         if (user != null && passwordEncoder.matches(blogFridayUserDTO.getUser_password(), user.getUser_password())) {

            SignResponse signResponse = SignResponse.builder().user_idemail(user.getUser_idemail()).build();

            return ResponseEntity.ok(signResponse);
         } else {
            // 사용자 정보가 존재하지 않거나 비밀번호가 일치하지 않는 경우 예외 처리
            throw new WrongEmailPasswordException("이메일 또는 비밀번호가 올바르지 않습니다.");
         }
      }

   
   
   
   // 회원정보 가져오기
   @Operation(summary = "회원정보 가져오기", description = "회원정보 가져오기 API")
   @GetMapping("/user/{user_idemail}")
   public ResponseEntity<BlogFridayUserDTO> getUser(@PathVariable("user_idemail") String user_idemail) {

      BlogFridayUserDTO user = userService.viewUserProcess(user_idemail);
      return ResponseEntity.ok(user);
   }

   // 회원정보 수정
   @PutMapping("/user/update")
   public ResponseEntity<SignResponse> updateUsers(
         @RequestParam(value = "user_profile", required = false) MultipartFile profilePicture,
         @RequestParam("user_idemail") String user_idemail, @RequestParam("user_name") String user_name,
         @RequestParam("user_password") String user_password,
         @RequestParam("user_phonenumber") String user_phonenumber,
         @RequestParam("user_nickname") String user_nickname) {
      log.info("사진넘어오니?", profilePicture);
      BlogFridayUserDTO blogFridayUserDTO = new BlogFridayUserDTO();

      blogFridayUserDTO.setUser_idemail(user_idemail);
      blogFridayUserDTO.setUser_password(passwordEncoder.encode(user_password));
      blogFridayUserDTO.setUser_name(user_name);
      blogFridayUserDTO.setUser_phonenumber(user_phonenumber);
      blogFridayUserDTO.setUser_nickname(user_nickname);

//        // 변경된 비밀번호가 있는지 확인
//        if (blogFridayUserDTO.getUser_password() != null && !blogFridayUserDTO.getUser_password().isEmpty()) {
//            // 새로운 비밀번호를 암호화하여 설정
//            blogFridayUserDTO.setUser_password(passwordEncoder.encode(blogFridayUserDTO.getUser_password()));
//        }

      // 업데이트된 회원 정보를 처리하고 응답 반환
      SignResponse response = userService.updateUserProcess(blogFridayUserDTO, profilePicture);
      return ResponseEntity.ok(response);
   }

   // 회원탈퇴
   @Operation(summary = "회원탈퇴", description = "회원탈퇴 API")
   @DeleteMapping("/user/delete/{user_idemail}")
   public ResponseEntity<Object> deleteUser(@PathVariable("user_idemail") String user_idemail) {
      // 회원 정보 삭제
      userService.deleteUserProcess(user_idemail);

      // 회원 탈퇴 시 Redis에서 토큰 값 삭제
      tokenService.deleteToken(user_idemail);

      return ResponseEntity.ok(null);
   }

   // 판매허가
   @PutMapping("/user/updatestate/{user_id}")
   public ResponseEntity<String> updateUserState(@PathVariable("user_id") int user_id) {

      userService.updateUserStateProcess(user_id);
      return ResponseEntity.ok("판매허가");
   }

   @GetMapping("/user/findID")
   public ResponseEntity<String> findByEmail(@RequestParam("user_name") String user_name,
                                             @RequestParam("user_phonenumber") String user_phonenumber,
                                             @RequestParam("user_findhome") String user_findhome,
                                             @RequestParam("user_findname") String user_findname) {
      log.info("이름은?:{}",user_name);
      log.info("전번은?:{}",user_phonenumber);
      log.info("고향은?:{}",user_findhome);
      log.info("별명은?:{}",user_findname);
       String user_idemail = userService.findIdByEmail(user_name, user_phonenumber, user_findhome, user_findname);
       if (user_idemail != null) {
           return ResponseEntity.ok(user_idemail); // 사용자 이메일을 찾은 경우 200 OK 응답 반환
       } else {
           return ResponseEntity.notFound().build(); // 사용자를 찾지 못한 경우 404 응답 반환
       }
   }

    @PostMapping("/user/okuer")
    public int okuserAuthentication(@RequestBody BlogFridayUserDTO userDTO) {
        // 클라이언트로부터 받은 사용자 정보를 기반으로 인증을 수행하고 결과를 반환
        return userService.OkuserBypass(userDTO.getUser_idemail(), userDTO.getUser_name(), userDTO.getUser_phonenumber(), userDTO.getUser_findhome(), userDTO.getUser_findname());
    }

       
    
   
    
    @PutMapping("/user/FindPass")
    public ResponseEntity<Object> changePassword(@RequestParam ("user_idemail") String user_idemail,
                                                 @RequestParam("user_password") String user_password) {
        
//        log.info("아이디 넘어오나?:{}", user_idemail);
//        log.info("비번 넘어오나?:{}", user_password);

        BlogFridayUserDTO blogFridayUserDTO = new BlogFridayUserDTO();
        
        blogFridayUserDTO.setUser_idemail(user_idemail);
        blogFridayUserDTO.setUser_password(passwordEncoder.encode(user_password));
        
        // 서비스 레이어의 메서드를 호출하여 비밀번호 변경 요청 처리
        SignResponse response = userService.updateUserPass(blogFridayUserDTO);
        
        // 변경된 결과를 클라이언트에게 반환
        return ResponseEntity.ok(response);
    }

    
}// end class