package com.allhomekitchenUsers.UserDataControl.service.impl;

import com.allhomekitchenUsers.UserDataControl.entity.User;
import com.allhomekitchenUsers.UserDataControl.exception.ServiceException;
import com.allhomekitchenUsers.UserDataControl.repository.UsersRepository;
import com.allhomekitchenUsers.UserDataControl.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersRepository userRepository;

    @Override
    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
            }
        };
    }

    @Override
    public long getUserIdByUsername(String username) {
        log.info("Fetching user by username : "+username);
        Optional<User> user = null;
        try{
            user = userRepository.findByEmail(username);
            if(user==null){
                throw new ServiceException("Username not found");
            }
        }catch (ServiceException serviceException){
           log.info(new ServiceException("username doesnot exist"));
        }

        log.info("User  : "+user);

        if(user.isPresent()){
            return user.get().getId();
        }
        return 0;
    }
}
