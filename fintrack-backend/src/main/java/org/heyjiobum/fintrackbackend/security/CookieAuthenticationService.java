package org.heyjiobum.fintrackbackend.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.heyjiobum.fintrackbackend.security.jwt.JwtService;
import org.heyjiobum.fintrackbackend.security.model.MyUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class CookieAuthenticationService {
    JwtService jwtService;
    String cookieName;

    CookieAuthenticationService(JwtService jwtService,
                                @Value("${jwt.cookie-name}") String cookieName) {
        this.jwtService = jwtService;
        this.cookieName = cookieName;
    }

    public void setTokenInCookie(HttpServletResponse response, Authentication authentication) {
        String token = jwtService.generateToken(authentication);
        setTokenInCookie(response, token);
    }

    public void setTokenInCookie(HttpServletResponse response, MyUser user){
        String token = jwtService.generateToken(user);
        setTokenInCookie(response, token);
    }

    public void setTokenInCookie(HttpServletResponse response, UserDetails user){
        String token = jwtService.generateToken(user);
        setTokenInCookie(response, token);
    }

    public void setTokenInCookie(HttpServletResponse response, String token){
        Instant expiration = jwtService.extractExpiration(token);

        var cookie = new Cookie(cookieName, token);
        cookie.setPath("/");
        cookie.setDomain(null);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge((int) ChronoUnit.SECONDS.between(Instant.now(), expiration));

        response.addCookie(cookie);
    }
}
