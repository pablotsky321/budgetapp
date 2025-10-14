package com.pablodev.budgetApp.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pablodev.budgetApp.dtos.UserDTO;
import com.pablodev.budgetApp.entities.UserEntity;
import com.pablodev.budgetApp.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private UserDTO createUserDTO(UserEntity userEntity){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userEntity.getId().toString());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setName(userEntity.getName());
        userDTO.setLastname(userEntity.getLastname());
        userDTO.setRoles(userEntity.getRoles());
        return userDTO;
    }

    private List<UserDTO> createUserDTOList(List<UserEntity> userEntityList){
        List<UserDTO> userDTOList = userEntityList.stream().map(this::createUserDTO).toList();
        return userDTOList;
    }

    public UserEntity findById(String userId) throws ClassNotFoundException{
       return userRepository.findById(UUID.fromString(userId)).orElseThrow(() -> new ClassNotFoundException("User not found"));
    }

    public UserDTO createUser(UserDTO userDTO) throws Exception{

        Optional<UserEntity> userOp = userRepository.findByEmail(userDTO.getEmail());
        if(userOp.isPresent()){
            throw new Exception("User already exists");
        }
        userOp = null;
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setName(userDTO.getName());
        userEntity.setLastname(userDTO.getLastname());
        userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userEntity.setRoles(userDTO.getRoles());

        userDTO.setId(userRepository.save(userEntity).getId().toString());
        return userDTO;

    }

    public List<UserDTO> getAllUsers(){
        List<UserEntity> userEntityList = userRepository.findAll();
        return createUserDTOList(userEntityList);
    }

    public UserDTO getUserById(String id) throws ClassNotFoundException{
       UserEntity userEntity = findById(id);
       return createUserDTO(userEntity);
    }

    public UserDTO updateUser(UserDTO userDTO, String id) throws ClassNotFoundException{
        
            UserEntity userEntity = findById(id);
            userEntity.setEmail(userDTO.getEmail());
            userEntity.setName(userDTO.getName());
            userEntity.setLastname(userDTO.getLastname());
            userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            if(hasAuthority("admin")){
            userEntity.setRoles(userDTO.getRoles());
            }
            userRepository.save(userEntity);
            return userDTO;
    }

    public String deleteUser(String id) throws ClassNotFoundException{
        UserDTO userDTO = getUserById(id);
        if(userDTO != null){
            userRepository.deleteById(UUID.fromString(id));
            return "user deleted";
        }
        return null;
    }

    private boolean hasAuthority(String authority) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        return userDetails.getAuthorities()
        .stream()
        .anyMatch(ga -> ga.getAuthority().equals(authority));
    }
    
    
}
