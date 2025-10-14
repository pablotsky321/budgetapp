package com.pablodev.budgetApp.security.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.pablodev.budgetApp.security.filters.JwtFilter;
import com.pablodev.budgetApp.security.services.UserDetailsServiceImp;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsServiceImp userDImp;

    private final JwtFilter jwtFilter;
    
    @Bean
    SecurityFilterChain filterChain(HttpSecurity https) throws Exception{

        return https
        .csrf(csrf->{
            csrf.disable();
        })
        .cors(cors->{
           cors.configurationSource(corsConfigurationSource());
        })
        .sessionManagement(session->{
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            session.maximumSessions(1);
        })
        .authorizeHttpRequests(request->{
            request.requestMatchers("/css/**").permitAll();
            request.requestMatchers("/js/**").permitAll();
            request.requestMatchers("/auth/**").permitAll();
            request.requestMatchers("/admin_panel/**").hasAnyAuthority("admin");
            request.requestMatchers("/test/user").hasAnyAuthority("user");
            request.requestMatchers("/test/admin").hasAnyAuthority("admin");
            request.requestMatchers("/billType/**").hasAnyAuthority("user");
            request.requestMatchers("/bill/**").hasAnyAuthority("user");
            request.anyRequest().authenticated();
        })
        
        /* 
         .formLogin(form -> {
            form.loginPage("/auth/login");                // GET: muestra tu login
            form.loginProcessingUrl("/auth/login");        // POST: procesa credenciales
            form.defaultSuccessUrl("/admin_panel/", true);
            form.permitAll();
         }
        )
         */
        .authenticationProvider(authenticationProvider())
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
    }
    
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        return configuration.getAuthenticationManager();
    }

    @Bean
    AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    UserDetailsService userDetailsService(){
        return userDImp;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000")); // ORIGEN del frontend
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS","PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // si manejas cookies / auth
        config.setMaxAge(3600L);   

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }                                

}                                    
