package com.pablodev.budgetApp.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BillTypeDTO {
    
    private String id;
    private String userId;
    private String bill_type;
    private String description;

}
