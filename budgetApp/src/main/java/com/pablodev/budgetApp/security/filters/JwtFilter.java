package com.pablodev.budgetApp.security.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pablodev.budgetApp.security.services.UserDetailsServiceImp;
import com.pablodev.budgetApp.security.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImp userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
            
        String token = extractToken(request);
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String email = jwtUtil.getEmail(token);
        
        if(email == null){
            filterChain.doFilter(request, response);
            return;
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        if(!jwtUtil.isValid(token, userDetails)){
            filterChain.doFilter(request, response);
            return;
        }

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,null,userDetails.getAuthorities());
        securityContext.setAuthentication(authenticationToken);
        SecurityContextHolder.setContext(securityContext);

        filterChain.doFilter(request, response);


    }

    
    private String extractToken(HttpServletRequest request){

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null) return null;
        String token = header.substring(7);
        return token;
        
    }

}
