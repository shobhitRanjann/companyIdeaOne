package com.allhomekitchenUsers.UserDataControl.service;

import com.allhomekitchenUsers.UserDataControl.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailsService();

    long getUserIdByUsername(String username);

    UserDTO getUserByEmail(String email);
}
