package com.pablodev.budgetApp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pablodev.budgetApp.dtos.BillDTO;
import com.pablodev.budgetApp.entities.BillEntity;
import com.pablodev.budgetApp.entities.BillTypeEntity;
import com.pablodev.budgetApp.entities.UserEntity;
import com.pablodev.budgetApp.repositories.BillRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BillService {

    private final BillTypeService billTypeService;
    private final UserService userService;
    private final BillRepository billRepository;

    private BillDTO creaBillDTO(BillEntity billEntity){
        BillDTO billDTO = new BillDTO();
        billDTO.setId(billEntity.getId().toString());
        billDTO.setBillName(billEntity.getBillName());
        billDTO.setBillValue(billEntity.getBillValue());
        billDTO.setBillType(billTypeService.createBillTypeDTO(billEntity.getBillType()));
        return billDTO;
    }

    private List<BillDTO> createBillDTOList(List<BillEntity> billList){
        List<BillDTO> billDTOList = new ArrayList<>();
        for (BillEntity bill : billList) {
            billDTOList.add(creaBillDTO(bill));
        }
        return billDTOList;
    }

    public List<BillDTO> getAllBills(){
        List<BillEntity> billList = billRepository.findAll();
        return createBillDTOList(billList);
    }

    public BillEntity findById(String id) throws ClassNotFoundException{
        return billRepository.findById(UUID.fromString(id)).orElseThrow(() -> new ClassNotFoundException("Bill not found"));
    }

    public BillDTO getBillById(String id) throws ClassNotFoundException{
        BillEntity bill = findById(id);
        return creaBillDTO(bill);
    }

    public List<BillDTO> getBillByBillType(String billTypeId) throws ClassNotFoundException{
        BillTypeEntity billType = billTypeService.findById(billTypeId);
        return createBillDTOList(billRepository.findByBillType(billType));
    }

    public List<BillDTO> getBillByUser(String idUser) throws ClassNotFoundException{
        UserEntity user = userService.findById(idUser);
        return createBillDTOList(billRepository.getByUser(user));
    }

    public BillDTO insertBill(BillDTO billDTO, String billTypeId) throws ClassNotFoundException{
        BillTypeEntity billType = billTypeService.findById(billTypeId);
        BillEntity bill = new BillEntity();
        bill.setBillName(billDTO.getBillName());
        bill.setBillValue(billDTO.getBillValue());
        bill.setBillType(billType);
        bill = billRepository.save(bill);
        billDTO.setBillType(billTypeService.createBillTypeDTO(billType));
        billDTO.setId(bill.getId().toString());
        return billDTO;
    }

    public BillDTO updateBill(BillDTO billDTO, String id, String billTypeId) throws ClassNotFoundException{
        BillEntity bill = findById(id);
        BillTypeEntity billType = billTypeService.findById(billTypeId);
        bill.setBillName(billDTO.getBillName());
        bill.setBillValue(billDTO.getBillValue());
        bill.setBillType(billType);
        billDTO.setBillType(billTypeService.createBillTypeDTO(billType));
        billRepository.save(bill);
        return billDTO;
    }

    public String deleteBill(String id) throws ClassNotFoundException{
        BillEntity bill = findById(id);
        billRepository.delete(bill);
        return "Bill deleted";
    }

}
