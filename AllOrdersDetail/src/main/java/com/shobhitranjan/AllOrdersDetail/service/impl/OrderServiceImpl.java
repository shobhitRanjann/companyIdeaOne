package com.shobhitranjan.AllOrdersDetail.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shobhitranjan.AllOrdersDetail.entity.AllOrders;
import com.shobhitranjan.AllOrdersDetail.entity.ProductData;
import com.shobhitranjan.AllOrdersDetail.entity.YesNo;
import com.shobhitranjan.AllOrdersDetail.external.client.ProductService;
import com.shobhitranjan.AllOrdersDetail.external.client.UserService;
import com.shobhitranjan.AllOrdersDetail.modal.*;
import com.shobhitranjan.AllOrdersDetail.repository.OrderRepository;
import com.shobhitranjan.AllOrdersDetail.service.OrderService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    ProductService productService;

    @Autowired
    private UserService userService;

    public List<AllOrders> findBy(String u){
        return orderRepository.findByProductownerid(u);
    }

    @Override
    public void sendOrderFromUser(RequestOrderData requestOrderData) throws IOException {
        log.info("saving order with "+requestOrderData);
        System.out.println( "saving all info  > "+requestOrderData );
        ObjectMapper objectMapper = new ObjectMapper();
        ResponseEntity<?> productData =  productService.findUserByProductId(requestOrderData.getProductId());
        ProductData productData1 = new ProductData();
        ProductData pd = objectMapper.convertValue(productData.getBody(), ProductData.class);
        AllOrders order = AllOrders.builder()
                .userid(requestOrderData.getUserid())
                .productId(requestOrderData.getProductId())
                .productownerid(requestOrderData.getProductuserid())
                .additionalmessage(requestOrderData.getMessage())
                .orderdatetime(Date.from(Instant.now()))
                .paymentstatus(YesNo.NO)
                .ownerresponded(false)
                .build();
        orderRepository.save(order);
       // orderRepository
    }

    @Override
    public List<AllOrders> getAllOrdersofUsers() {
        return orderRepository.findAll();
    }

    @Override
    public List<OrderDetailsWithUserDataResponse> getAllOrdersOfUser(String id) {
        log.info("getting user from order details by user id "+id);
        long user = userService.getUserIdByUsername(id);
        List<AllOrders> allOrders = orderRepository.findByProductownerid(String.valueOf(user));
        List<OrderDetailsWithUserDataResponse> orderDetailsWithUserDataResponse = new ArrayList<>();
        allOrders.stream().forEach(e ->{
            System.out.println("Getting user id >>  "+e.getUserid());
            UserDTO userDTO = userEmail(e.getUserid());
            OrderDetailsWithUserDataResponse orderDetailsWithUserDataResponse1 = new OrderDetailsWithUserDataResponse();
            orderDetailsWithUserDataResponse1.setId(e.getId());
            orderDetailsWithUserDataResponse1.setUserDTO(userDTO);
            orderDetailsWithUserDataResponse1.setProductId(getProductByid(Long.parseLong(e.getProductId())));
            orderDetailsWithUserDataResponse1.setPersonAge(String.valueOf(getAge(userDTO.getDateofbirth())));
            orderDetailsWithUserDataResponse1.setProductownerid(e.getProductownerid());
            orderDetailsWithUserDataResponse1.setUserapproved(e.isUserapproved());
            orderDetailsWithUserDataResponse1.setAdditionalmessage(e.getAdditionalmessage());
            orderDetailsWithUserDataResponse1.setAdditionalmessage_byowner(e.getAdditionalmessage_byowner());
            orderDetailsWithUserDataResponse1.setOrderdatetime(e.getOrderdatetime());
            orderDetailsWithUserDataResponse1.setPaymentstatus(e.getPaymentstatus());
            orderDetailsWithUserDataResponse1.setResponded(e.isOwnerresponded());
            orderDetailsWithUserDataResponse1.setReviewdone(e.isReviewdone());
            orderDetailsWithUserDataResponse.add(orderDetailsWithUserDataResponse1);
        }
        );

        return orderDetailsWithUserDataResponse;
    }
    @Override
    public List<OrderDetailsWithUserDataResponse> getOrdersOfUserCustomer(String id) {
        log.info(id.toLowerCase().length());
        log.info("getting user from order details by user id "+id+ "   "+id.substring(0));
        System.out.println("all order "+orderRepository.findByUserid(id));
        List<AllOrders> allOrders = orderRepository.findByUserid(id.trim());
        List<OrderDetailsWithUserDataResponse> orderDetailsWithUserDataResponse = new ArrayList<>();
        System.out.println("all order "+allOrders);
        allOrders.stream().forEach(e ->{
                    System.out.println("Getting user id >>  "+e.getUserid());
                    UserDTO userDTO = userEmail(e.getUserid());
                    OrderDetailsWithUserDataResponse orderDetailsWithUserDataResponse1 = new OrderDetailsWithUserDataResponse();
                    orderDetailsWithUserDataResponse1.setId(e.getId());
                    orderDetailsWithUserDataResponse1.setUserDTO(userDTO);
                    orderDetailsWithUserDataResponse1.setProductId(getProductByid(Long.parseLong(e.getProductId())));
                    orderDetailsWithUserDataResponse1.setPersonAge(String.valueOf(getAge(userDTO.getDateofbirth())));
                    orderDetailsWithUserDataResponse1.setProductownerid(e.getProductownerid());
                    orderDetailsWithUserDataResponse1.setUserapproved(e.isUserapproved());
                    orderDetailsWithUserDataResponse1.setAdditionalmessage(e.getAdditionalmessage());
                    orderDetailsWithUserDataResponse1.setAdditionalmessage_byowner(e.getAdditionalmessage_byowner());
                    orderDetailsWithUserDataResponse1.setOrderdatetime(e.getOrderdatetime());
                    orderDetailsWithUserDataResponse1.setPaymentstatus(e.getPaymentstatus());
                    orderDetailsWithUserDataResponse1.setResponded(e.isOwnerresponded());
                    orderDetailsWithUserDataResponse1.setReviewdone(e.isReviewdone());
                    orderDetailsWithUserDataResponse.add(orderDetailsWithUserDataResponse1);
                }
        );

        return orderDetailsWithUserDataResponse;
    }

    @Override
    public void responseFromOwnerRatingAndEnd(OwnerResponse ownerResponse) {
        if(orderRepository.findById(Long.parseLong(ownerResponse.getId())).isPresent()) {
            AllOrders allOrders = orderRepository.findById(Long.parseLong(ownerResponse.getId())).get();
            allOrders.setUserrating(Float.parseFloat(ownerResponse.getReplyfromowner()));
            allOrders.setPaymentstatus(YesNo.YES);
            allOrders.setOwnerresponsetime(Date.from(Instant.now()));
            allOrders.setOwnerresponded(true);
            orderRepository.save(allOrders);
        }
    }

    @Override
    public void saveCustomerResponse(CustomerResponse customerResponse) {
        if(orderRepository.findById(Long.parseLong(customerResponse.getId())).isPresent()) {
            AllOrders allOrders = orderRepository.findById(Long.parseLong(customerResponse.getId())).get();
            allOrders.setAdditionalmessage(customerResponse.getReplyfromcustomer());
            orderRepository.save(allOrders);
        }
    }

    @Override
    public void responseFromOwnerRejectButton(OwnerResponse ownerResponse) {
        if(orderRepository.findById(Long.parseLong(ownerResponse.getId())).isPresent()) {
            AllOrders allOrders = orderRepository.findById(Long.parseLong(ownerResponse.getId())).get();
            allOrders.setAdditionalmessage_byowner(ownerResponse.getReplyfromowner());
            allOrders.setUserapproved(ownerResponse.isAccepted());
            allOrders.setOwnerresponded(true);
            orderRepository.save(allOrders);
        }
    }

    @Override
    public void reviewupdater(String reviewstatus) {
        if(orderRepository.findById(Long.parseLong(reviewstatus)).isPresent()) {
            AllOrders allOrders = orderRepository.findById(Long.parseLong(reviewstatus)).get();
            allOrders.setReviewdone(true);
            orderRepository.save(allOrders);
        }
    }

    @Override
    public void saveOwnerResponse(OwnerResponse ownerResponse){
        if(orderRepository.findById(Long.parseLong(ownerResponse.getId())).isPresent()) {
            AllOrders allOrders = orderRepository.findById(Long.parseLong(ownerResponse.getId())).get();
            allOrders.setAdditionalmessage_byowner(ownerResponse.getReplyfromowner());
            allOrders.setUserapproved(ownerResponse.isAccepted());
            orderRepository.save(allOrders);
        }
    }

    AllProducts getProductByid(long id){
        return productService.getProductByProductId(id);
}

    public static int getAge(Date dateOfBirth) {

        Calendar today = Calendar.getInstance();
        Calendar birthDate = Calendar.getInstance();

        int age = 0;

        birthDate.setTime(dateOfBirth);
        if (birthDate.after(today)) {
            throw new IllegalArgumentException("Can't be born in the future");
        }

        age = today.get(Calendar.YEAR) - birthDate.get(Calendar.YEAR);

        // If birth date is greater than todays date (after 2 days adjustment of leap year) then decrement age one year
        if ( (birthDate.get(Calendar.DAY_OF_YEAR) - today.get(Calendar.DAY_OF_YEAR) > 3) ||
                (birthDate.get(Calendar.MONTH) > today.get(Calendar.MONTH ))){
            age--;

            // If birth date and todays date are of same month and birth day of month is greater than todays day of month then decrement age
        }else if ((birthDate.get(Calendar.MONTH) == today.get(Calendar.MONTH )) &&
                (birthDate.get(Calendar.DAY_OF_MONTH) > today.get(Calendar.DAY_OF_MONTH ))){
            age--;
        }

        return age;
    }
    UserDTO userEmail(String emailid){
        System.out.println("This is email id "+emailid);
        return userService.getUserByEmail(emailid);
    }

}
