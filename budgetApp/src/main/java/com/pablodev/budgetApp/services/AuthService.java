package com.pablodev.budgetApp.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pablodev.budgetApp.dtos.LoginRequest;
import com.pablodev.budgetApp.dtos.UserDTO;
import com.pablodev.budgetApp.entities.UserEntity;
import com.pablodev.budgetApp.repositories.UserRepository;
import com.pablodev.budgetApp.security.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserDetailsService userDetailsService;

    private final JwtUtil jwtUtil;

    public UserDTO register(UserDTO userDTO) throws Exception{
        if( userRepository.findByEmail(userDTO.getEmail()).isPresent()){
            throw new Exception("User already exists");
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setName(userDTO.getName());
        userEntity.setLastname(userDTO.getLastname());
        userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        List<String> roles = new ArrayList<>();
        roles.add("user");
        userEntity.setRoles(roles);
        userDTO.setId(userRepository.save(userEntity).getId().toString());
        return userDTO;
    }

    public Map<String, Object> login(LoginRequest loginRequest) throws ClassNotFoundException{
        Optional<UserEntity> userOp = userRepository.findByEmail(loginRequest.email());
        if(userOp.isEmpty()){
            throw new ClassNotFoundException("Invalid email");
        }
        Map<String, Object> response = new HashMap<>();
        Authentication authentication = authenticate(loginRequest);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generateToken(loginRequest.email());
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("user_id",userOp.get().getId().toString());
        userOp = null;
        return response;
    }

    private Authentication authenticate(LoginRequest loginRequest){
        String email = loginRequest.email();
        String password = loginRequest.password();

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        if(userDetails == null) throw new BadCredentialsException("Invalid email or password");

        if(!passwordEncoder.matches(password, userDetails.getPassword())) throw new BadCredentialsException("Invalid password");

        return new UsernamePasswordAuthenticationToken(email, password, userDetails.getAuthorities());
    }


}
