package com.shobhitranjan.AddProduct.model;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ResponseData {
    public long productId;
    public String productName;
    public String productLocalName;
    public String productType;
    public String productDescription;
    public int productPrice;
    public String productStatus;
    public String productState;
    public String productCity;
    public String productUserLocation;
    public String productUserid;
    public int userPinCode;
    private List<String> productImagePath;
}
