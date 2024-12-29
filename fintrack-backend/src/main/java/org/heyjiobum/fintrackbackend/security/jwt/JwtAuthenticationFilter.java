package org.heyjiobum.fintrackbackend.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Stream;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final String jwtCookieName;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   @Value("${jwt.cookie-name}") String jwtCookieName) {
        this.jwtService = jwtService;
        this.jwtCookieName = jwtCookieName;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        if (request.getCookies() != null){
            Optional<Cookie> cookieOptional = Stream.of(request.getCookies())
                    .filter(cookie -> cookie.getName().equals(jwtCookieName))
                    .findFirst();

            if (cookieOptional.isPresent()) {
                Cookie cookie = cookieOptional.get();
                String token = cookie.getValue();
                try {
                    if (jwtService.isTokenValid(token)) {
                        String username = jwtService.extractUsername(token);
                        String[] roles = jwtService.extractRoles(token);
                        Collection<SimpleGrantedAuthority> authorities = Stream.of(roles)
                                .map(str -> "ROLE_" + str)
                                .map(SimpleGrantedAuthority::new)
                                .toList();
                        RememberMeAuthenticationToken authenticationToken = new RememberMeAuthenticationToken(
                                token, username, authorities
                        );
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                }
                catch (Exception ignored) {
                    filterChain.doFilter(request, response);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}