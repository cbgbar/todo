package com.example.todoapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiKeyConfig {

    @Value("${api.key}")
    private String apiKey;

    public String getApiKey() {
        System.out.println("API Key từ application.properties: " + apiKey); // Thêm log
        return apiKey;
    }
}