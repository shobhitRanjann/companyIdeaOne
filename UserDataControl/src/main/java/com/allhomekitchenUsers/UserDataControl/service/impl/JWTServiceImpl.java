package com.allhomekitchenUsers.UserDataControl.service.impl;

import com.allhomekitchenUsers.UserDataControl.entity.User;
import com.allhomekitchenUsers.UserDataControl.repository.UsersRepository;
import com.allhomekitchenUsers.UserDataControl.service.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
@Log4j2
public class JWTServiceImpl implements JWTService {

    @Autowired
    UsersRepository usersRepository;
    public String generateToken(UserDetails userDetails){
        log.info("generate token  ::: ",getsignKey());
        User user = usersRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        Claims claims = Jwts.claims().setSubject(userDetails.getUsername());
        claims.put("role", user.getRole());
        claims.put("name", user.getFirstName());
        return Jwts.builder().setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getsignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(HashMap<String, Object> extraClaims, UserDetails userDetails){
        log.info("generate refresh token  ::: ",getsignKey());
        return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 604800000))
                .signWith(getsignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUserName(String token){
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers){
        final Claims claims = extratAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    private Key getsignKey(){
        log.info("genrating signing key");
        byte[] key = Decoders.BASE64.decode("eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTc5NTkyNDcsImV4cCI6MTY5Nzk2MDY4N30");
        log.info("generated signin key : "+ key);
        return Keys.hmacShaKeyFor(key);
    }

    private Claims extratAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getsignKey()).build().parseClaimsJws(token).getBody();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token){
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getsignKey()).build().parseClaimsJws(token);
    }
}
