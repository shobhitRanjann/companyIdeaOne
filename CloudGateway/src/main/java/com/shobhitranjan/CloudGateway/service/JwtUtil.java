package com.shobhitranjan.CloudGateway.service;

import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
@Service
public class JwtUtil {

    public static String SECRET="eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTc5NTkyNDcsImV4cCI6MTY5Nzk2MDY4N30";

//    JwtUtil(@Value("${secret}") String SECRET) {
//        this.SECRET = SECRET;
//    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }

}
