package org.heyjiobum.fintrackbackend.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.security.CookieAuthenticationService;
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
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final CookieAuthenticationService cookieAuthenticationService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        if (request.getCookies() != null){
            Cookie[] cookies = request.getCookies();
            Optional<String> tokenOptional = cookieAuthenticationService.extractTokenFromCookies(cookies);

            if (tokenOptional.isPresent()) {
                String token = tokenOptional.get();
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