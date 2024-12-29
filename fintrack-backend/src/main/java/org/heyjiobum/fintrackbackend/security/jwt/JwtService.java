package org.heyjiobum.fintrackbackend.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.heyjiobum.fintrackbackend.security.model.MyUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class JwtService {
    private final String secret;
    private final long validity;

    JwtService(@Value("${jwt.secret-key}") String secret) {
        this.secret = secret;
        this.validity = TimeUnit.HOURS.toMillis(24);
    }

    public String generateToken(Authentication authentication) {
        return generateToken(authentication.getName(), String.valueOf(authentication.getAuthorities()));
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails.getUsername(), String.valueOf(userDetails.getAuthorities()));
    }

    public String generateToken(MyUser user){
        return generateToken(user.getUsername(), user.getRoles().split(","));
    }

    private String generateToken(String username, String... roles) {
        Map<String, Object> claims = new HashMap<>();
        String joinedRoles = String.join(",", roles);
        claims.put("authorities", joinedRoles);
        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusMillis(validity)))
                .signWith(generateKey())
                .compact();
    }

    private SecretKey generateKey() {
        byte[] decodedKey = Base64.getDecoder().decode(secret);
        return Keys.hmacShaKeyFor(decodedKey);
    }

    public Claims getClaims(String jwt) {
        return Jwts.parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(jwt)
                .getPayload();
    }

    public String extractUsername(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.getSubject();
    }

    public Instant extractExpiration(String jwt) {
        Claims claims = getClaims(jwt);
        Date expiration = claims.getExpiration();
        return expiration.toInstant();
    }

    public String extractAuthorities(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.get("authorities", String.class);
    }

    public boolean isTokenValid(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.getExpiration().toInstant().isAfter(Instant.now());
    }
}