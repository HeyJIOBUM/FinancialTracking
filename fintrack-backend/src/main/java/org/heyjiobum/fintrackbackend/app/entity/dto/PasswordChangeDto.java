package org.heyjiobum.fintrackbackend.app.entity.dto;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PasswordChangeDto {
    @Pattern(regexp = "^[a-zA-Z0-9]{4,20}$",
            message = "Password must have from 4 to 20 characters, only numbers and letters are allowed")
    private String oldPassword;

    @Pattern(regexp = "^[a-zA-Z0-9]{4,20}$",
            message = "Password must have from 4 to 20 characters, only numbers and letters are allowed")
    private String newPassword;
}
