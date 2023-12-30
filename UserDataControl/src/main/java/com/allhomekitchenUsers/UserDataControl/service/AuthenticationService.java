package com.allhomekitchenUsers.UserDataControl.service;

import com.allhomekitchenUsers.UserDataControl.dto.JWTAuthenticationResponse;
import com.allhomekitchenUsers.UserDataControl.dto.RefreshTokenRequest;
import com.allhomekitchenUsers.UserDataControl.dto.SignInRequest;
import com.allhomekitchenUsers.UserDataControl.dto.SignUpRequest;
import com.allhomekitchenUsers.UserDataControl.entity.User;
import com.allhomekitchenUsers.UserDataControl.exception.ServiceException;

public interface AuthenticationService {
    User signUp(SignUpRequest signUpRequest);
    JWTAuthenticationResponse signIn(SignInRequest signInRequest);
    JWTAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

    String validateToken(String token) throws ServiceException;

}
