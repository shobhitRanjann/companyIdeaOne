package com.shobhitranjan.AllOrdersDetail.service;

import com.shobhitranjan.AllOrdersDetail.entity.AllOrders;
import com.shobhitranjan.AllOrdersDetail.modal.CustomerResponse;
import com.shobhitranjan.AllOrdersDetail.modal.OrderDetailsWithUserDataResponse;
import com.shobhitranjan.AllOrdersDetail.modal.OwnerResponse;
import com.shobhitranjan.AllOrdersDetail.modal.RequestOrderData;

import java.io.IOException;
import java.util.List;

public interface OrderService {

    void sendOrderFromUser(RequestOrderData requestOrderData) throws IOException;
    List<AllOrders> getAllOrdersofUsers();

    List<OrderDetailsWithUserDataResponse> getAllOrdersOfUser(String id);

    void saveOwnerResponse(OwnerResponse ownerResponse);

    List<OrderDetailsWithUserDataResponse> getOrdersOfUserCustomer(String id);

    void responseFromOwnerRatingAndEnd(OwnerResponse ownerResponse);

    void saveCustomerResponse(CustomerResponse customerResponse);

    void responseFromOwnerRejectButton(OwnerResponse ownerResponse);

    void reviewupdater(String reviewstatus);
}
