package com.example.todoapi.filter;

import com.example.todoapi.config.ApiKeyConfig;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ApiKeyFilter extends OncePerRequestFilter {

    private final ApiKeyConfig apiKeyConfig;

    @Autowired
    public ApiKeyFilter(ApiKeyConfig apiKeyConfig) {
        this.apiKeyConfig = apiKeyConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Lấy query parameter apiKey
        String apiKey = request.getParameter("apiKey");
        System.out.println("Query parameter apiKey: " + apiKey); // Thêm log
        System.out.println("API Key từ application.properties: " + apiKeyConfig.getApiKey()); // Thêm log

        if (apiKey == null || !apiKey.equals(apiKeyConfig.getApiKey())) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("API Key không hợp lệ hoặc thiếu");
            return;
        }

        filterChain.doFilter(request, response);
    }
}