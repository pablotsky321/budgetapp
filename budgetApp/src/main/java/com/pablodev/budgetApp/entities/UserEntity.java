package com.pablodev.budgetApp.entities;

import lombok.*;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "users", indexes = {
    @Index(name="user_email_index", columnList = "email")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "email", length = 150, unique=true)
    private String email;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "lastname", length = 50)
    private String lastname;

    @Column(name = "password")
    private String password;

    
    @Column(name = "roles", nullable = false)
    @JdbcTypeCode(SqlTypes.ARRAY)
    private List<String> roles;

    @Column(name = "expenses")
    private BigDecimal expenses = BigDecimal.ZERO;

    @Column(name = "earning")
    private BigDecimal earning = BigDecimal.ZERO;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BillTypeEntity> billTypes;

}