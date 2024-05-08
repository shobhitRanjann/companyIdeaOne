package com.shobhitranjan.AllOrdersDetail.modal;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class UserDTO {

    String firstName;
    String lastName;
    String email;
    Date dateofbirth;
    String gender;
    String occupation;
    Date date;
}
