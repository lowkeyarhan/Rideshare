package com.rideshare.backend.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private static final String SECRET = "RIDESHARE_SUPER_SECRET_KEY_32BYTES_MINIMUM_123456";
    private final Key signingKey = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // Generate JWT token for a given username and role
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract username from JWT token
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    // Extract role from JWT token
    public String extractRole(String token) {
        return (String) getClaims(token).get("role");
    }

    // Check if the token is valid (not expired)
    public String getUsernameFromToken(String token) {
        return extractUsername(token);
    }

    // Check if the token is valid (not expired)
    public boolean isTokenValid(String token) {
        return !isExpired(token);
    }

    // Validate token against username
    public boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username) && !isExpired(token);
    }

    // Check if the token is expired
    private boolean isExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    // Get claims from JWT token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(signingKey).build().parseClaimsJws(token).getBody();
    }
}
