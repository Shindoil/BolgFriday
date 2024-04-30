package com.blogfriday.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

//SwaggerConfig을 작성을 한 다음 server 재실행을 한다.
// http://localhost:8090/swagger-ui/index.html#/
@Configuration
public class SwaggerConfig {

	@Bean
    public OpenAPI openAPI() {    
        Info info = new Info()
                .version("v1.0.0")
                .title("API")
                .description("");
        
        String accessToken = "Access Token (Bearer)";
        String refreshToken = "Refresh Token";
        
        SecurityRequirement securityRequirement = new SecurityRequirement()
            .addList(accessToken)
            .addList(refreshToken);
        
        SecurityScheme accessTokenSecurityScheme = new SecurityScheme()
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT")
            .in(SecurityScheme.In.HEADER)
            .name("Authorization");
        
        SecurityScheme refreshTokenSecurityScheme = new SecurityScheme()        	
            .type(SecurityScheme.Type.APIKEY)
            .in(SecurityScheme.In.HEADER)
            .name("Authorization-refresh");

        Components components = new Components()
            .addSecuritySchemes(accessToken, accessTokenSecurityScheme)
            .addSecuritySchemes(refreshToken, refreshTokenSecurityScheme);

        return new OpenAPI()
                .info(info)
                .addSecurityItem(securityRequirement)
                .components(components);
        

    }
}