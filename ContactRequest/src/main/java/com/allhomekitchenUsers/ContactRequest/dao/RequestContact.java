package com.allhomekitchenUsers.ContactRequest.dao;


import lombok.Data;

@Data
public class RequestContact {

    String username;
    String title;
    String message;
    String location;
    String pinCode;

}
