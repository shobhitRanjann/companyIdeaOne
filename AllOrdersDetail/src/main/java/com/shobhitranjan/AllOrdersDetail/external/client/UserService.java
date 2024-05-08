package com.shobhitranjan.AllOrdersDetail.external.client;


import com.shobhitranjan.AllOrdersDetail.exception.ClientException;
import com.shobhitranjan.AllOrdersDetail.modal.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "USER-DATA/api/v1/auth")
public interface UserService {

    @GetMapping("/getuserid")
    public long getUserIdByUsername(@RequestParam("username") String username);
    @GetMapping("/userDetails/{email}")
    public UserDTO getUserByEmail(@PathVariable String email);

    default void fallback(Exception e) throws ClientException {
        throw new ClientException("User Service Is Down","Unavailable",500);
    }
}
