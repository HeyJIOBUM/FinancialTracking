package org.heyjiobum.fintrackbackend.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.heyjiobum.fintrackbackend.security.model.MyUserDetailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Optional;
import java.util.stream.Stream;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final MyUserDetailService userDetailService;
    private final String cookieName;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   MyUserDetailService userDetailService,
                                   @Value("${jwt.cookie-name}") String cookieName) {
        this.jwtService = jwtService;
        this.userDetailService = userDetailService;
        this.cookieName = cookieName;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Optional<Cookie> cookieOptional = Stream.of(request.getCookies())
                .filter(cookie -> cookie.getName().equals(cookieName))
                .findFirst();

        if (cookieOptional.isPresent()) {
            Cookie cookie = cookieOptional.get();
            String token = cookie.getValue();

            Instant expiration = jwtService.extractExpiration(token);

            String username = jwtService.extractUsername(token);
            try {
                UserDetails userDetails = userDetailService.loadUserByUsername(username);
                if (expiration.isAfter(Instant.now())) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            username,
                            userDetails.getPassword(),
                            userDetails.getAuthorities()
                    );
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
            catch (UsernameNotFoundException e) {
                filterChain.doFilter(request, response);
            }
        }

        filterChain.doFilter(request, response);
    }
}