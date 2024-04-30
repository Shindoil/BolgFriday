package com.blogfriday.security.jwt;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.blogfriday.user.dto.SignResponse;
import com.blogfriday.user.service.UserServiceImp;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter  {
	private static final int ACCESS_EXPIRED = 701;
    private static final int REFRESH_EXPIRED = 702;
    private static final int DOUBLE_EXPIRED = 703;
    
    private final UserServiceImp userServiceImp;   
 
  
    
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
			
		
		String  accessToken = request.getHeader("Authorization");
		log.info("accessToken:{}", accessToken);
		
		String refreshToken =request.getHeader("Authorization-refresh");
		log.info("refreshToken:{}", refreshToken);
		
        Boolean isAccessToken = null;
        Boolean isRefreshToken = null;

        if(accessToken != null) {           
        	System.out.println("accessToken:" + accessToken);
        	 System.out.println("refreshToken:" + refreshToken);
        	String authAccToken = accessToken.split(" ")[1];        	 
           
            log.info("token Expiration : " + JwtProvider.isExpired(authAccToken));
            isAccessToken = JwtProvider.isExpired(authAccToken);
            isRefreshToken = JwtProvider.isExpired(refreshToken);
             log.info("isAccessToken : " + isAccessToken);
             log.info("isRefreshToken : " + isRefreshToken);
        }
		
        if(Boolean.TRUE.equals(isAccessToken) && Boolean.TRUE.equals(isRefreshToken)) {
            response.sendError(DOUBLE_EXPIRED);
        	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "DOUBLE_EXPIRED");
           return;        	
        }else if(Boolean.FALSE.equals(isAccessToken) && Boolean.TRUE.equals(isRefreshToken)) {
           response.sendError(REFRESH_EXPIRED);
          return;
        	
         
        }else if(Boolean.TRUE.equals(isAccessToken) && Boolean.FALSE.equals(isRefreshToken)) {
        	//accessToken은 만료가 되었고 refreshToken은 유효한 경우...
        	response.sendError(ACCESS_EXPIRED);
            return;
        	 
        }

        if(accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }

        if(!accessToken.startsWith("Bearer "))  {
            filterChain.doFilter(request, response);
            return;
        }

        String token = accessToken.split(" ")[1];

        String userIdEmail = JwtProvider.getByUserIdEmail(token);

        SignResponse loginUser = userServiceImp.getByUserIdEmail(userIdEmail);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginUser.getUser_idemail(), null, null);

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request, response);
    }

}// end class()












