package com.pablodev.budgetApp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/user")
    public String userTest() {
        return "user test";
    }

    @GetMapping("/admin")
    public String adminTest(){
        return "admin test";
    }
    

}
