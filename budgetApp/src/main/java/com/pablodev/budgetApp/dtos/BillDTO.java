package com.pablodev.budgetApp.dtos;

import java.math.BigDecimal;

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
public class BillDTO {

    private String id;
    private BillTypeDTO billType;
    @Size(max = 100, message = "bill name must be less than 100 characters")
    private String billName;
    @NotBlank(message = "bill value must not be blank")
    private BigDecimal billValue;

}
