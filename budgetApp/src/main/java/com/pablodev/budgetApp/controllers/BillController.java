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

import com.pablodev.budgetApp.dtos.BillDTO;
import com.pablodev.budgetApp.services.BillService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bill")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllBills(){
        return ResponseEntity.ok(billService.getAllBills());
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> getBillById(@PathVariable String id){
        try {
            return ResponseEntity.ok(billService.getBillById(id));
        } catch (ClassNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/findByBillType/{billTypeId}")
    public ResponseEntity<?> getBillByBillType(@PathVariable String billTypeId){
        try {
            return ResponseEntity.ok(billService.getBillByBillType(billTypeId));
        } catch (ClassNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/findByUser/{idUser}")
    public ResponseEntity<?> getBillByUser(@PathVariable String idUser){
        try {
            return ResponseEntity.ok(billService.getBillByUser(idUser));
        } catch (ClassNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create/{billTypeId}")
    public ResponseEntity<?> insertBill(@RequestBody BillDTO billDTO,@PathVariable String billTypeId){
        try {
            return ResponseEntity.ok(billService.insertBill(billDTO, billTypeId));
        } catch (ClassNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateBill(@RequestBody BillDTO billDTO, @RequestParam String id, @RequestParam String billTypeId){
        try {
            return ResponseEntity.ok(billService.updateBill(billDTO, id, billTypeId));
        } catch (ClassNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBill(@PathVariable String id){
        try {
            return ResponseEntity.ok(billService.deleteBill(id));
        } catch (ClassNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
