package org.heyjiobum.fintrackbackend.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.heyjiobum.fintrackbackend.security.model.MyUserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;
import java.util.stream.Stream;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final MyUserService userService;
    private final String cookieName;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   MyUserService userService,
                                   @Value("${jwt.cookie-name}") String cookieName) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.cookieName = cookieName;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        if (request.getCookies() != null){
            Optional<Cookie> cookieOptional = Stream.of(request.getCookies())
                    .filter(cookie -> cookie.getName().equals(cookieName))
                    .findFirst();

            if (cookieOptional.isPresent()) {
                Cookie cookie = cookieOptional.get();
                String token = cookie.getValue();
                try {
                    if (jwtService.isTokenValid(token)) {
                        String username = jwtService.extractUsername(token);
                        Optional<UserDetails> userDetailsOptional = userService.loadUserDetailsByUsername(username);
                        if (userDetailsOptional.isPresent()) {
                            UserDetails userDetails = userDetailsOptional.get();
                            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                    userDetails.getUsername(),
                                    userDetails.getPassword(),
                                    userDetails.getAuthorities()
                            );
                            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                        }
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