package org.heyjiobum.fintrackbackend.app.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
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
    public void register(@RequestBody MyUser myUser, HttpServletResponse response) {
        boolean isUserRegistered = authenticationService.tryToRegister(myUser);

        if (isUserRegistered){
            cookieAuthenticationService.setTokenInCookie(response, myUser);
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else
            response.setStatus(HttpServletResponse.SC_CONFLICT);
    }

    @PostMapping("/login")
    public void login(@RequestBody MyUser myUser, HttpServletResponse response) {
        boolean isUserLoggedIn = authenticationService.tryToLogin(myUser);

        if (isUserLoggedIn){
            cookieAuthenticationService.setTokenInCookie(response, myUser);
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else
            response.setStatus(HttpServletResponse.SC_CONFLICT);
    }
}
