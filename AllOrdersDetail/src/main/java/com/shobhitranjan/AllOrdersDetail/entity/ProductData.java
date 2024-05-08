package com.shobhitranjan.AllOrdersDetail.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductData {
    private long productId;
    private long userId;
    private String productName;
    private String productLocalName;
    private String productType;
    private String productDescription;
    private int productPrice;
    private String productStatus;
    private String productState;
    private String productCity;
    private String productLocation;
    private int userPinCode;
    private boolean productImageAvailable;
    private List<String> productImagePath;
}
