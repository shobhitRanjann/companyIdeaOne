package com.shobhitranjan.AddProduct.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "hk_products")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Data
public class AllProducts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;
    private long userId;
    private String productName;
    private String productLocalName;
    private String productType;
    private String productDescription;
    private int productPrice;
    private String productStatus;
    private String productLocation;
    private int userPinCode;
    private boolean productImageAvailable;
    private List<String> productImagePath;
}
