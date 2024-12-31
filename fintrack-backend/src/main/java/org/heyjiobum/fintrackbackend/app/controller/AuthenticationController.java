package org.heyjiobum.fintrackbackend.app.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
import org.heyjiobum.fintrackbackend.app.entity.dto.MyUserDTO;
import org.heyjiobum.fintrackbackend.app.service.AuthenticationService;
import org.heyjiobum.fintrackbackend.security.CookieAuthenticationService;
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
}
