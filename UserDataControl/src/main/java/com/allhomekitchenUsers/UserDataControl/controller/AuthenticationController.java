package com.allhomekitchenUsers.UserDataControl.controller;

import com.allhomekitchenUsers.UserDataControl.dto.JWTAuthenticationResponse;
import com.allhomekitchenUsers.UserDataControl.dto.RefreshTokenRequest;
import com.allhomekitchenUsers.UserDataControl.dto.SignInRequest;
import com.allhomekitchenUsers.UserDataControl.dto.SignUpRequest;
import com.allhomekitchenUsers.UserDataControl.entity.User;
import com.allhomekitchenUsers.UserDataControl.service.AuthenticationService;
import com.allhomekitchenUsers.UserDataControl.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Log4j2
public class AuthenticationController {

    @Autowired
    private final AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody SignUpRequest signUpRequest){
        log.info("in signup request");
        return ResponseEntity.ok(authenticationService.signUp(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<JWTAuthenticationResponse> signIn(@RequestBody SignInRequest signInRequest){
        JWTAuthenticationResponse authenticationRes = authenticationService.signIn(signInRequest);
        log.info("in signIn function of UserDataControl AuthenticationController >>> "+ authenticationRes);
        if(authenticationRes == null){
            log.info("in AuthenticationController signIn method , sending user is null");
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(authenticationRes);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JWTAuthenticationResponse> refreshToken(@RequestBody RefreshTokenRequest signInRequest){
        log.info("in refresh token function of UserDataControl AuthenticationController");
        return ResponseEntity.ok(authenticationService.refreshToken(signInRequest));
    }

    @GetMapping("validate-token")
    public ResponseEntity<Object> validateToken(@RequestParam("token") String token) {
        try {
            log.info("The getToken() Enpoint start");
            String generateToken = authenticationService.validateToken(token);
            log.trace("The Genarte token " + generateToken);
            return new ResponseEntity<>(generateToken, HttpStatus.OK);
        } catch (Exception e) {
            log.error("INTERNAL_SERVER_ERROR");
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/getuserid")
    public long getUserIdByUsername(@RequestParam("username") String username){
        log.info("calling controller getUserIdByUsername with username : "+username);
        return userService.getUserIdByUsername(username);
    }
}
