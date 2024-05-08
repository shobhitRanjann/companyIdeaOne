package com.shobhit.ReviewStore.dao;

import lombok.Data;

@Data
public class RequestData {
    String username;
    String productid;
    String orderid;
    String stars;
    String comment;
}
