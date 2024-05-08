package com.shobhitranjan.AllOrdersDetail.modal;

import com.shobhitranjan.AllOrdersDetail.entity.YesNo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsWithUserDataResponse {
    long id;
    UserDTO userDTO;
    AllProducts productId;
    String productownerid;
    String personAge;
    boolean userapproved;
    String additionalmessage;
    String additionalmessage_byowner;
    Date orderdatetime;
    YesNo paymentstatus;
    boolean responded;
    boolean reviewdone;
}
