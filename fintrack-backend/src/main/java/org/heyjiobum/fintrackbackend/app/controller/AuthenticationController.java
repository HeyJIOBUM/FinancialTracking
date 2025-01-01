package org.heyjiobum.fintrackbackend.app.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
import org.heyjiobum.fintrackbackend.app.entity.dto.MyUserDTO;
import org.heyjiobum.fintrackbackend.app.entity.dto.PasswordChangeDto;
import org.heyjiobum.fintrackbackend.app.service.AuthenticationService;
import org.heyjiobum.fintrackbackend.security.CookieAuthenticationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthenticationController {
    private AuthenticationService authenticationService;
    private CookieAuthenticationService cookieAuthenticationService;

    @PostMapping("/register")
    public void register(@Valid @RequestBody MyUserDTO myUserDto, HttpServletResponse response) {
        MyUser myUser = myUserDto.constructMyUser();
        authenticationService.tryToRegister(myUser);
        cookieAuthenticationService.setTokenInCookie(response, myUser);
    }

    @PostMapping("/login")
    public void login(@Valid @RequestBody MyUserDTO myUserDto, HttpServletResponse response) {
        MyUser myUser = myUserDto.constructMyUser();
        authenticationService.tryToLogin(myUser);
        cookieAuthenticationService.setTokenInCookie(response, myUser);
    }

    @PostMapping("/me/change_password")
    public void changePassword(@Valid @RequestBody PasswordChangeDto passwordChangeDto) {
        String username = this.getCurrentlyAuthenticatedUsername();
        authenticationService.tryToChangePassword(username, passwordChangeDto);
    }

    private String getCurrentlyAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
