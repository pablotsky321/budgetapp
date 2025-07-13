package com.pablodev.budgetApp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pablodev.budgetApp.dtos.BillTypeDTO;
import com.pablodev.budgetApp.entities.BillTypeEntity;
import com.pablodev.budgetApp.entities.UserEntity;
import com.pablodev.budgetApp.repositories.BillTypeRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BillTypeService {

    private final UserService userService;
    private final BillTypeRepository billTypeRepository;

    public BillTypeDTO createBillTypeDTO(BillTypeEntity billType) {
        BillTypeDTO billTypeDTO = new BillTypeDTO();
        billTypeDTO.setId(billType.getId().toString());
        billTypeDTO.setBill_type(billType.getBillType());
        billTypeDTO.setDescription(billType.getDescription());
        billTypeDTO.setUserId(billType.getUser().getId().toString());
        return billTypeDTO;
    }

    private List<BillTypeDTO> createBillTypeDTOList(List<BillTypeEntity> billTypeList) {
        List<BillTypeDTO> billTypeDTOList = new ArrayList<>();
        for (BillTypeEntity billType : billTypeList) {
            billTypeDTOList.add(createBillTypeDTO(billType));
        }
        return billTypeDTOList;
    }

    public BillTypeEntity findById(String id) throws ClassNotFoundException{
        return billTypeRepository.findById(UUID.fromString(id)).orElseThrow(() -> new ClassNotFoundException("Bill type not found"));
    }

    public List<BillTypeDTO> getAllBillTypes() {
        List<BillTypeEntity> billTypeList = billTypeRepository.findAll();
        return createBillTypeDTOList(billTypeList);
    }

    public BillTypeDTO getBillTypeById(String id) throws ClassNotFoundException {
        BillTypeEntity billType = findById(id);
        return createBillTypeDTO(billType);
    }

    public List<BillTypeDTO> getBillTypeByUser(String id) throws ClassNotFoundException{
        UserEntity user = userService.findById(id);
        List<BillTypeEntity> billTypeList = billTypeRepository.findByUser(user);
        return createBillTypeDTOList(billTypeList);
    }

    public BillTypeDTO insertBillType(BillTypeDTO billTypeDTO) throws ClassNotFoundException{
        UserEntity user = userService.findById(billTypeDTO.getUserId());
        BillTypeEntity billType = new BillTypeEntity();
        billType.setBillType(billTypeDTO.getBill_type());
        billType.setUser(user);
        billType.setDescription(billTypeDTO.getDescription());
        billTypeRepository.save(billType);
        return billTypeDTO;
    }

    public BillTypeDTO updateBillType(BillTypeDTO billTypeDTO, String id) throws ClassNotFoundException{
        BillTypeEntity billType = findById(id);
        billType.setBillType(billTypeDTO.getBill_type());
        billType.setDescription(billTypeDTO.getDescription());
        billTypeRepository.save(billType);
        billTypeDTO.setId(id);
        billTypeDTO.setUserId(billType.getUser().getId().toString());
        return billTypeDTO;
    }

    public String deleteBillType(String id) throws ClassNotFoundException{
        BillTypeEntity billType = findById(id);
        billTypeRepository.delete(billType);
        return "Bill type deleted";
    }

    

}
