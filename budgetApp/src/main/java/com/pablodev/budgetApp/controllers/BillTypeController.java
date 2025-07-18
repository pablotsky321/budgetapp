package com.pablodev.budgetApp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pablodev.budgetApp.dtos.BillTypeDTO;
import com.pablodev.budgetApp.services.BillTypeService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/billType")
@RequiredArgsConstructor
public class BillTypeController {

    private final BillTypeService billTypeService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllBillTypes() {
        return ResponseEntity.ok(billTypeService.getAllBillTypes());
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> getBillTypeById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(billTypeService.getBillTypeById(id));
        } catch (ClassNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findByUserId/{userId}")
    public ResponseEntity<?> getBillTypeByUser(@PathVariable String userId){
        try {
            return ResponseEntity.ok(billTypeService.getBillTypeByUser(userId));
        } catch (ClassNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> insertBillType(@RequestBody BillTypeDTO billTypeDTO){
        try {
            return ResponseEntity.ok(billTypeService.insertBillType(billTypeDTO));
        } catch (ClassNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBillType(@RequestBody BillTypeDTO billTypeDTO, @PathVariable String id){
        try {
            return ResponseEntity.ok(billTypeService.updateBillType(billTypeDTO, id));
        } catch (ClassNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBillType(@PathVariable String id){
        try {
            return ResponseEntity.ok(billTypeService.deleteBillType(id));
        } catch (ClassNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
