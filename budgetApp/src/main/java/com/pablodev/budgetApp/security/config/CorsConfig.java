package com.pablodev.budgetApp.security.config;

import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")             // todas las rutas
                .allowedOrigins("*")           // o el dominio de tu frontend
                .allowedMethods("*")           // GET, POST, PUT, DELETE…
                .allowedHeaders("*")
                .allowCredentials(true)        // si usas cookies/token
                .maxAge(3600);
    }

}
