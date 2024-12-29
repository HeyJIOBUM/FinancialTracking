package org.heyjiobum.fintrackbackend.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.heyjiobum.fintrackbackend.entity.MyUser;
import org.heyjiobum.fintrackbackend.security.jwt.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.stream.Stream;

@Component
public class CookieAuthenticationService {
    JwtService jwtService;
    String jwtCookieName;

    CookieAuthenticationService(JwtService jwtService,
                                @Value("${jwt.cookie-name}") String jwtCookieName) {
        this.jwtService = jwtService;
        this.jwtCookieName = jwtCookieName;
    }

    public void setTokenInCookie(HttpServletResponse response, Authentication authentication) {
        String token = jwtService.generateToken(authentication);
        setTokenInCookie(response, token);
    }

    public void setTokenInCookie(HttpServletResponse response, MyUser user){
        String token = jwtService.generateToken(user);
        setTokenInCookie(response, token);
    }

    public void setTokenInCookie(HttpServletResponse response, String token){
        Instant expiration = jwtService.extractExpiration(token);

        var cookie = new Cookie(jwtCookieName, token);
        cookie.setPath("/");
        cookie.setDomain(null);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge((int) ChronoUnit.SECONDS.between(Instant.now(), expiration));

        response.addCookie(cookie);
    }

    public Optional<String> extractTokenFromCookies(Cookie[] cookies) {
        if (cookies != null) {
            Optional<Cookie> cookieOptional = Stream.of(cookies)
                    .filter(cookie -> cookie.getName().equals(jwtCookieName))
                    .findFirst();

            if (cookieOptional.isPresent()) {
                Cookie jwtCookie = cookieOptional.get();
                return Optional.ofNullable(jwtCookie.getValue());
            }
        }
        return Optional.empty();
    }
}
