package com.shobhitranjan.AllOrdersDetail.external.client;

import com.shobhitranjan.AllOrdersDetail.exception.ClientException;
import com.shobhitranjan.AllOrdersDetail.modal.AllProducts;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "PRODUCT-STORE/product")
public interface ProductService {
    @GetMapping("/findbyproductid")
    public ResponseEntity<?> findUserByProductId(@RequestParam("productid") String productid);
    @GetMapping("/getproductbyid/{id}")
    public AllProducts getProductByProductId(@PathVariable("id") long id);
    default void fallback(Exception e) throws ClientException {
        throw new ClientException("User Service Is Down","Unavailable",500);
    }
}
