package com.pablodev.budgetApp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequestMapping("admin_panel")
public class AdminPanelController {

    @GetMapping()
    public String admin() {
        return "admin_dashboard";
    }
    

}
