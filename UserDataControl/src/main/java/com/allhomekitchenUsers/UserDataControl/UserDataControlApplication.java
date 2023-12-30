package com.allhomekitchenUsers.UserDataControl;

import com.allhomekitchenUsers.UserDataControl.entity.Role;
import com.allhomekitchenUsers.UserDataControl.entity.User;
import com.allhomekitchenUsers.UserDataControl.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class UserDataControlApplication implements CommandLineRunner {

	@Autowired
	private UsersRepository usersRepository;

	public static void main(String[] args) {
		SpringApplication.run(UserDataControlApplication.class, args);
	}


	public void run(String... args){
		User usersDetails = usersRepository.findByRole(Role.ADMIN);
		if(usersDetails==null){
			User allUsersDetails = new User();
			allUsersDetails.setEmail("admin@gmail.com");
			allUsersDetails.setFirstName("admin");
			allUsersDetails.setLastName("admin");
			allUsersDetails.setRole(Role.ADMIN);
			allUsersDetails.setPassword(new BCryptPasswordEncoder().encode("admin"));
			usersRepository.save(allUsersDetails);
		}
	}
}
