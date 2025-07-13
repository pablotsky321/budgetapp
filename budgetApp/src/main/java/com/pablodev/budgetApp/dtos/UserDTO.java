package com.pablodev.budgetApp.dtos;

import java.util.List;

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
public class UserDTO {

    private String id;
    @NotBlank
    @Size(max = 150)
    private String email;
    @NotBlank
    @Size(max = 50)
    private String name;
    @NotBlank
    @Size(max = 50)
    private String lastname;
    @NotBlank
    @Size(min=8, max = 16)
    private String password;
    private List<String> roles;

}
