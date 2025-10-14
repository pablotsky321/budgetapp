package com.pablodev.budgetApp.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bills", indexes = {
    @Index(name="bill_billTypeId_index", columnList = "bill_type_id")
})
public class BillEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "bill_name", length = 100)
    private String billName;

    @Column(name = "bill_value")
    private BigDecimal billValue;

    @ManyToOne
    @JoinColumn(name = "bill_type_id", nullable = false)
    private BillTypeEntity billType;
    
}