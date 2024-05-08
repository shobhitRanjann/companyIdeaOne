package com.shobhitranjan.AllOrdersDetail;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AllOrdersDetailApplication {

	public static void main(String[] args) {
		SpringApplication.run(AllOrdersDetailApplication.class, args);
	}

}
