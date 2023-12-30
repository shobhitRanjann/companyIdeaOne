package com.shobhitranjan.AddProduct.model;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RequestData {

    public String productName;
    public String productLocalName;
    public String productType;
    public String productDescription;
    public int productPrice;
    public String productStatus;
    public String productUserLocation;
    public int userPinCode;
}
