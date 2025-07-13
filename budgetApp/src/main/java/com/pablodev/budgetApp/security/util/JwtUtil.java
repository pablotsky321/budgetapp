package com.pablodev.budgetApp.security.util;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Service
public class JwtUtil {

    @Value("${jwt.secret}")
    String secret;

    public String generateToken(String username){

        Algorithm algorithm = Algorithm.HMAC384(secret);
        String token = JWT
        .create()
        .withSubject(username)
        .withIssuedAt(LocalDateTime.now().toInstant(ZoneOffset.UTC))
        .withExpiresAt(LocalDateTime.now().toInstant(ZoneOffset.UTC).plusSeconds(86400))
        .sign(algorithm);
        return token;

    }    

    public DecodedJWT decoded(String token){
        Algorithm algorithm = Algorithm.HMAC384(secret);
        return JWT.require(algorithm).build().verify(token);
    }

    

    private boolean isExpired(String token){
        return decoded(token).getExpiresAt().before(new Date());
    }

    public boolean isValid(String token, UserDetails userDetails){
        String username = decoded(token).getSubject();
        return !isExpired(token) && (userDetails.getUsername().equals(username));
    }

    public String getEmail(String token){
        return decoded(token).getSubject();
    }

}
