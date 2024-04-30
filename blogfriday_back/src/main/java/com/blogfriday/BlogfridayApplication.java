package com.blogfriday;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.blogfriday.*.repository")
public class BlogfridayApplication {
    public static void main(String[] args) {
        SpringApplication.run(BlogfridayApplication.class, args);
    }
}