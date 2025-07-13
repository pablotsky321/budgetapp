package com.pablodev.budgetApp.repositories;

import com.pablodev.budgetApp.entities.BillEntity;
import com.pablodev.budgetApp.entities.BillTypeEntity;
import com.pablodev.budgetApp.entities.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface BillRepository extends JpaRepository<BillEntity, UUID> {

    List<BillEntity> findByBillType(BillTypeEntity billType);
    
    @Query("SELECT b FROM BillEntity b JOIN FETCH b.billType bt JOIN bt.user u WHERE u = :userEntity")
    List<BillEntity> getByUser(UserEntity userEntity);

}