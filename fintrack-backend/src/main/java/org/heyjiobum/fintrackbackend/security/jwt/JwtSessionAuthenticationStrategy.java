package org.heyjiobum.fintrackbackend.security.jwt;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.security.CookieAuthenticationService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class JwtSessionAuthenticationStrategy implements SessionAuthenticationStrategy {
    CookieAuthenticationService cookieAuthenticationService;

    @Override
    public void onAuthentication(Authentication authentication,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws SessionAuthenticationException {
        if (authentication instanceof UsernamePasswordAuthenticationToken) {
            cookieAuthenticationService.setTokenInCookie(response, authentication);
        }
    }
}