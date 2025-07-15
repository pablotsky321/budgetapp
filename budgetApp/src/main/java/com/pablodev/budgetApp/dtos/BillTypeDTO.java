package com.pablodev.budgetApp.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
    @NotBlank(message = "user id must not be blank")
    private String userId;
    @NotBlank(message = "bill type must not be blank")
    @Size(max = 50, message = "bill type must be less than 50 characters")
    private String bill_type;
    private String description;

}
