package org.heyjiobum.fintrackbackend.security;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.security.jwt.JwtAuthenticationFilter;
import org.heyjiobum.fintrackbackend.security.jwt.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.csrf.CsrfFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfiguration {
    private final SessionAuthenticationStrategy tokenCookieSessionAuthenticationStrategy;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CookieAuthenticationService cookieAuthenticationService;
    private final JwtService jwtService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(registry -> registry
                        .requestMatchers("/home", "/register", "/authenticate").permitAll()
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .requestMatchers("/user").hasRole("USER")
                        .requestMatchers("/user/{username:\\w+}").access(isUserOwnerAuthManager())
                        .anyRequest().permitAll())
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                        .sessionAuthenticationStrategy(tokenCookieSessionAuthenticationStrategy))
                .addFilterBefore(jwtAuthenticationFilter, CsrfFilter.class)
                .build();
    }

    AuthorizationManager<RequestAuthorizationContext> isUserOwnerAuthManager() {
        return (authentication, requestContext) -> {
            String authenticationUsername = authentication.get().getName();
            String pathUsername = requestContext.getVariables().get("username");
            return new AuthorizationDecision(authenticationUsername.equals(pathUsername));
        };
    }
}