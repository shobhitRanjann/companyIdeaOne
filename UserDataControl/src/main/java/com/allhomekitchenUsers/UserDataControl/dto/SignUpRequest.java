package com.allhomekitchenUsers.UserDataControl.dto;

import lombok.Data;

import java.time.Instant;
import java.util.Date;

@Data
public class SignUpRequest {

    private String firstName;
    private String lastName;
    private String userName;
    private String gender;
    private Date dateofbirth;
    private String occupation;
    private String password;
}
