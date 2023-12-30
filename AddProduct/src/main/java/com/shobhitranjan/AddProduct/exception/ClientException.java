package com.shobhitranjan.AddProduct.exception;

import lombok.Data;

@Data
public class ClientException extends RuntimeException{

    private String errorCode;
    private int status;
    ClientException(){
        super("ERROR");
    }

    public ClientException(String message, String errorCode, int status){
        super(message);
        this.errorCode = errorCode;
        this.status = status;
    }
}
