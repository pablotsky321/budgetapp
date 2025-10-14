package com.pablodev.budgetApp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pablodev.budgetApp.dtos.UserDTO;
import com.pablodev.budgetApp.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id){
        try {
            return ResponseEntity.ok(userService.getUserById(id));
        } catch (ClassNotFoundException e) {
           return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } 
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO){
        try {
            return ResponseEntity.ok(userService.createUser(userDTO));
        } catch (Exception e) {
           return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO, @RequestParam String id){
        try {
            return ResponseEntity.ok(userService.updateUser(userDTO, id));
        } catch (ClassNotFoundException e) {
           return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id){
        try {
            return ResponseEntity.ok(userService.deleteUser(id));
        } catch (ClassNotFoundException e) {
           return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
