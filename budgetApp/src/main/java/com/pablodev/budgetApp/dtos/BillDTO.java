package com.pablodev.budgetApp.dtos;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BillDTO {

    private String id;
    private BillTypeDTO billType;
    private String billName;
    private BigDecimal billValue;

}
