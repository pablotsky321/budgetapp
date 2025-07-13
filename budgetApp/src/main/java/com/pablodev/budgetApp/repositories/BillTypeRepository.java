package com.pablodev.budgetApp.repositories;

import com.pablodev.budgetApp.entities.BillTypeEntity;
import com.pablodev.budgetApp.entities.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BillTypeRepository extends JpaRepository<BillTypeEntity, UUID> {

    List<BillTypeEntity> findByUser(UserEntity user);

}