package com.blogfriday.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    private final RedisTemplate<String, Object> redisTemplate;

    public TokenService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveTokens(String userIdEmail, String accessToken, String refreshToken) {
        redisTemplate.opsForValue().set(userIdEmail + ":accessToken", accessToken);
        redisTemplate.opsForValue().set(userIdEmail + ":refreshToken", refreshToken);
    }

    public String getAccessToken(String userIdEmail) {
        Object accessToken = redisTemplate.opsForValue().get(userIdEmail + ":accessToken");
        return accessToken != null ? accessToken.toString() : null;
    }

    public String getRefreshToken(String userIdEmail) {
        Object refreshToken = redisTemplate.opsForValue().get(userIdEmail + ":refreshToken");
        return refreshToken != null ? refreshToken.toString() : null;
    }


    public void deleteToken(String userIdEmail) {
        redisTemplate.delete(userIdEmail + ":accessToken");
        redisTemplate.delete(userIdEmail + ":refreshToken");
    }

}