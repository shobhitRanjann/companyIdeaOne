package com.shobhitranjan.AddProduct;

import com.shobhitranjan.AddProduct.imgStorageConfig.StorageProperties;
import com.shobhitranjan.AddProduct.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
@EnableFeignClients
public class AddProductApplication {

	public static void main(String[] args) {
		SpringApplication.run(AddProductApplication.class, args);
	}

//	@Bean
//	CommandLineRunner init(ProductService storageService) {
//		return (args) -> {
//			storageService.deleteAll();
//			storageService.init();
//		};
//	}

}
