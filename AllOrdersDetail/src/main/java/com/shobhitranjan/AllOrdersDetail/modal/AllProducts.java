package com.shobhitranjan.AllOrdersDetail.modal;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Data
public class AllProducts {
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
