package org.heyjiobum.fintrackbackend.app.entity.dto;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;

@AllArgsConstructor
public class MyUserDTO {
    @Pattern(regexp = "^[a-zA-Z0-9]{4,20}$",
            message = "Username must have from 4 to 20 characters, only numbers and letters are allowed")
    private String username;

    @Pattern(regexp = "^[a-zA-Z0-9]{4,20}$",
            message = "Password must have from 4 to 20 characters, only numbers and letters are allowed")
    private String password;

    public MyUser constructMyUser() {
        return new MyUser(username, password);
    }
}
