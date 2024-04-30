package com.blogfriday.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtProvider {
	
	 private  static SecretKey key;	 
	 private final RedisTemplate<String, String> redisTemplate;
	 private long refreshExpirationTime;
	 
	 @PostConstruct
	 public  void init() {	 
		 this.key =   Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(JwtProperties.SECRET_KEY));	
	 }
	 	
	// Access Token 생성
	public static String createAccessToken(String userIdEmail) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("userIdEmail", userIdEmail);

		return Jwts.builder().claims(claims).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
				.signWith(key, Jwts.SIG.HS512)
				.subject("accessToken").compact();
	}

	// Refresh Token 생성
	public static String createRefreshToken(String userIdEmail) {
		Map<String, Object> claims = new HashMap<>();
		

		 String refreshToken =  Jwts.builder().claims(claims).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIRATION_TIME))
				.signWith(key, Jwts.SIG.HS512)
				.subject("refreshToken").compact();
		 
		
        return refreshToken;
	}

	// Claims에서 memberEmail 꺼내기
	public static String getByUserIdEmail(String token) {
		return extractClaims(token).get("userIdEmail").toString();
	}

	// 밝급된 Token이 만료 시간이 지났는지 체크
	public static boolean isExpired(String token) {
		Date expiredDate = null;
		try {
			System.out.println("=========================================================");
			
			expiredDate = extractClaims(token).getExpiration();
			System.out.println("expiredDate:" + expiredDate);
		} catch (ExpiredJwtException e) {
			return true;
		}
		// Token의 만료 날짜가 지금보다 이전인지 check
		return expiredDate.before(new Date());
	}

	// SecretKey를 사용해 Token Parsing
	public static Claims extractClaims(String token) throws ExpiredJwtException {		
		Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
		System.out.printf("claims:%s, %s", claims.getSubject(), claims.getExpiration());		
		return claims;
	}

	// 토큰 검증
	public static boolean validateToken(String token) {
		try {
			// Bearer 검증
			if (!token.substring(0, "BEARER ".length()).equalsIgnoreCase("BEARER ")) {
				return false;
			} else {
				token = token.split(" ")[1].trim();
			}

			Jwts.parser().verifyWith((SecretKey)key).build().parseSignedClaims(token);
			return true;
		} catch (SecurityException | MalformedJwtException e) {

			log.info("잘못된 JWT 서명입니다.");
		} catch (ExpiredJwtException e) {

			log.info("만료된 JWT 토큰입니다.");
		} catch (UnsupportedJwtException e) {

			log.info("지원되지 않는 JWT 토큰입니다.");
		} catch (IllegalArgumentException e) {

			log.info("JWT 토큰이 잘못되었습니다.");
		}

		return false;
	}

}
