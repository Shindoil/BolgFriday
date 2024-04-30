package com.blogfriday.security.config;
//[1] POSTMAN에서 테스트
//POST http://localhost:8090/login
//body, raw , json  => {"memberEmail":"min@daum.net", "memberPass":"1234"}

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.blogfriday.redis.TokenService;
import com.blogfriday.security.jwt.JwtProperties;
import com.blogfriday.security.jwt.JwtTokenFilter;
import com.blogfriday.user.repository.UserRepository;
import com.blogfriday.user.service.UserServiceImp;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration  // 해당 클래스를 Configuration으로 등록
@EnableWebSecurity //Spring Security가 Spring FileChain에 등록함 (즉 스프링 시큐리티를 활성화함)
@RequiredArgsConstructor

@Slf4j
public class SecurityConfig {
   
   private final UserServiceImp userServiceImp;
   private final TokenService tokenService;

   private static SecretKey key;
   
   @PostConstruct
   public void init() {
      this.key = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(JwtProperties.SECRET_KEY));
   }

   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      
      //csrf() : Cross Site Request Forgery로 사이트간 위조 요청으로 정상적인 사용자가 의도치 않은
      //위조 요청을 보내는 것을 의미한다.
      //http.csrf((csrf) -> csrf.disable());
      http.csrf(AbstractHttpConfigurer:: disable); //Spring Boot 3.XX에서 권장
      
      //인증사용, Security Filter에 등록 , @CrossOrigin (인증X)
      //세션끄기 : JWT를 사용하기 때문에 세션을 사용하지 않는다.
      http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
      
      //인증사용, Security Filter에 등록
      //http.apply(new MyCustomerFilter());
      
      http.addFilterBefore(new JwtTokenFilter(userServiceImp), UsernamePasswordAuthenticationFilter.class);
       
      //요청에 의한 인가(권한)검사 시작
      http.authorizeHttpRequests(authorize-> authorize
                           .anyRequest().permitAll());
//                              .requestMatchers("/images/**","/user/signup","/user/login","/board/list/**","/swagger-ui/**","/v3/api-docs/**").permitAll() //로그인 없이접근 허용한다.
//                              .anyRequest().authenticated()); //그외 모든 요청에 대해서 인증(로그인)이 되어야 한다.
      
      // SecurityConfig 클래스 내의 로그아웃 설정 부분 수정
      http
          .logout(logout -> logout
              .logoutUrl("/user/logout")
              .invalidateHttpSession(true)
              .clearAuthentication(true)
              .logoutSuccessHandler((request, response, authentication) -> {
                  String userIdEmail = request.getHeader("user_idemail"); // 클라이언트에서 전송한 userIdEmail 헤더를 가져옴
                  log.info(userIdEmail);
                  
                  if (userIdEmail != null) {
                      // Redis에서 userIdEmail에 해당하는 토큰을 가져와서 삭제하는 로직을 추가
                      String accessToken = tokenService.getAccessToken(userIdEmail);
                      String refreshToken = tokenService.getRefreshToken(userIdEmail);
                      
                      log.info(accessToken);
                      log.info(refreshToken);
                      

                       String token = accessToken.split(" ")[1];
                       log.info("logout token : " + token);
                       log.info("refreshToken : " + refreshToken);
                       try {
                           Claims claims = Jwts.parser().verifyWith((SecretKey)key)
                                 .build().parseSignedClaims(token)
                                   .getPayload();                     
                           tokenService.deleteToken(userIdEmail);
                       } catch (Exception e) {
                           log.error("Error parsing JWT: " + e.getMessage());
                       }
                   }
                   response.setStatus(HttpServletResponse.SC_OK);
              })
          )
          .exceptionHandling(exceptionHandling -> exceptionHandling
              .authenticationEntryPoint((request, response, authException) -> {
                  // 인증 실패 시 처리 로직
              })
          );
         
         return http.build();
              
}
              }// end class

