package com.shobhit.ReviewStore.external.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name = "ORDERS-DATA/orders")
public interface OrderDetails {
    @PutMapping("/reviewupdater/{id}")
    public ResponseEntity<?> reviewupdater(@PathVariable("id") String reviewstatus);
}
