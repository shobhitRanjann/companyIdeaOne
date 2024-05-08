package com.shobhitranjan.AllOrdersDetail.controller;

import com.shobhitranjan.AllOrdersDetail.entity.AllOrders;
import com.shobhitranjan.AllOrdersDetail.modal.CustomerResponse;
import com.shobhitranjan.AllOrdersDetail.modal.OrderDetailsWithUserDataResponse;
import com.shobhitranjan.AllOrdersDetail.modal.OwnerResponse;
import com.shobhitranjan.AllOrdersDetail.modal.RequestOrderData;
import com.shobhitranjan.AllOrdersDetail.service.OrderService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/orders")
@Log4j2
public class HomeController {

    @Autowired
    OrderService orderService;

    @PostMapping("/saveorder")
    public String sendOrderFromUser(@RequestBody RequestOrderData requestOrderData) throws IOException {
        orderService.sendOrderFromUser(requestOrderData);
        return "order sent";
    }

    @GetMapping("/fetchallorder")
    public List<AllOrders> getAllOrdersofUsers(){
        return orderService.getAllOrdersofUsers();
    }

    @GetMapping("/getorderofuser/{userid}")
    public List<OrderDetailsWithUserDataResponse> getOrdersOfUserOwner(@PathVariable("userid") String id){
        return orderService.getAllOrdersOfUser(id);
    }
    @GetMapping("/getorderofcustomer/{userid}")
    public List<OrderDetailsWithUserDataResponse> getOrdersOfUserCustomer(@PathVariable("userid") String id){
        return orderService.getOrdersOfUserCustomer(id);
    }
    @PutMapping("/ownerresponse")
    public ResponseEntity<?> responseFromOwner(@RequestBody OwnerResponse ownerResponse){
        orderService.saveOwnerResponse(ownerResponse);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/customerresponse")
    public ResponseEntity<?> responseFromCustomer(@RequestBody CustomerResponse customerResponse){
        orderService.saveCustomerResponse(customerResponse);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/ownerresponsewithrating")
    public ResponseEntity<?> responseFromOwnerRatingAndEnd(@RequestBody OwnerResponse ownerResponse){
        orderService.responseFromOwnerRatingAndEnd(ownerResponse);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/ownerresponsereject")
    public ResponseEntity<?> responseFromOwnerRejectButton(@RequestBody OwnerResponse ownerResponse){
        orderService.responseFromOwnerRejectButton(ownerResponse);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/reviewupdater/{id}")
    public ResponseEntity<?> reviewupdater(@PathVariable("id") String reviewstatus){
        log.info("updating review status of order id "+ reviewstatus);
        orderService.reviewupdater(reviewstatus);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
