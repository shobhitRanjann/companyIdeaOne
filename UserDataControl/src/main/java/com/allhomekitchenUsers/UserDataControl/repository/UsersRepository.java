package com.allhomekitchenUsers.UserDataControl.repository;

import com.allhomekitchenUsers.UserDataControl.entity.Role;
import com.allhomekitchenUsers.UserDataControl.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email) throws RuntimeException;

    User findByRole(Role role);
}
