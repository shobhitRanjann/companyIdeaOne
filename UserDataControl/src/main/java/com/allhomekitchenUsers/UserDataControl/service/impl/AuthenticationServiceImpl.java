package com.allhomekitchenUsers.UserDataControl.service.impl;

import com.allhomekitchenUsers.UserDataControl.dto.JWTAuthenticationResponse;
import com.allhomekitchenUsers.UserDataControl.dto.RefreshTokenRequest;
import com.allhomekitchenUsers.UserDataControl.dto.SignInRequest;
import com.allhomekitchenUsers.UserDataControl.dto.SignUpRequest;
import com.allhomekitchenUsers.UserDataControl.entity.Role;
import com.allhomekitchenUsers.UserDataControl.entity.User;
import com.allhomekitchenUsers.UserDataControl.exception.ServiceException;
import com.allhomekitchenUsers.UserDataControl.repository.UsersRepository;
import com.allhomekitchenUsers.UserDataControl.service.AuthenticationService;
import com.allhomekitchenUsers.UserDataControl.service.JWTService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Log4j2
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private final UsersRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    private final JWTService jwtService;
    public User signUp(SignUpRequest signUpRequest){
        log.info("in signup service");
        if(userRepository.findByEmail(signUpRequest.getUserName()).isPresent()){
            return new User();
        }
        User allUsersDetails = new User();
        allUsersDetails.setFirstName(signUpRequest.getFirstName());
        allUsersDetails.setLastName(signUpRequest.getLastName());
        allUsersDetails.setEmail(signUpRequest.getUserName());
        allUsersDetails.setRole(Role.USER);
        allUsersDetails.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        allUsersDetails.setDate(new Date(System.currentTimeMillis()));
        log.info("in signup service end");
        return userRepository.save(allUsersDetails);
    }


    public JWTAuthenticationResponse signIn(SignInRequest signInRequest) {
        var user1 = userRepository.findByEmail(signInRequest.getEmail());
        if(user1.isEmpty()){
            return null;
        }
        if(!passwordCheck(signInRequest.getPassword(), user1.get().getPassword())){
            log.info("user is null in signIn AuthenticationServiceImpl");
           return null;
        }
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(),
                signInRequest.getPassword()));
        System.out.println("after authenticationManager  " +authenticationManager);
        var user = userRepository.findByEmail(signInRequest.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid Username or Password!"));
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
        JWTAuthenticationResponse jwtAuthenticationResponse = new JWTAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        return jwtAuthenticationResponse;
    }

    public JWTAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow();

        if(jwtService.isTokenValid(refreshTokenRequest.getToken(), user)){
            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
            JWTAuthenticationResponse jwtAuthenticationResponse = new JWTAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshToken);
            return jwtAuthenticationResponse;
        }

        return null;
    }

    @Override
    public String validateToken(String token) throws ServiceException{
        String message = "";
        try {
            log.info("token validation started");
            jwtService.validateToken(token);
            log.info("token validation finished");
            message = "token validation successfull";
        }
        catch (Exception e){
            message = "token is not valid";
            log.warn("token error");
            throw new ServiceException(e);
        }
        return message;
    }

    public boolean passwordCheck(String password, String encodedPassword){
        log.info(password,"   kk    ", encodedPassword);
        log.info("password check "+passwordEncoder.matches(password, encodedPassword));
        return passwordEncoder.matches(password, encodedPassword);
    }

}
