package com.pablodev.budgetApp.security.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pablodev.budgetApp.entities.UserEntity;
import com.pablodev.budgetApp.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImp implements UserDetailsService{

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> userOp = userRepository.findByEmail(username);
        
        if(userOp.isEmpty()) throw new UsernameNotFoundException("email "+username+" not found");

        UserEntity user = userOp.get();

        List<GrantedAuthority> authorities = new ArrayList<>();
        for(String role : user.getRoles()){
            authorities.add(new SimpleGrantedAuthority(role));
        }

        return User
        .builder()
        .username(username)
        .password(user.getPassword())
        .roles(user.getRoles().get(0))
        .authorities(authorities)
        .build();

    }


    
}
