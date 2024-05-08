package com.shobhitranjan.AllOrdersDetail.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity(name = "hk_allorders")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AllOrders {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    @Column(name = "user_id")
    String userid;
    String productId;
    @Column(name = "product_ownerid")
    String productownerid;

    @Column(columnDefinition = "boolean default false")
    boolean userapproved;
    @Column(nullable = true)
    String additionalmessage;
    @Column(nullable = true)
    String additionalmessage_byowner;
    @Enumerated(EnumType.STRING)
    YesNo paymentstatus;
    @Column(name = "user_rating", columnDefinition = "float default 0.0")
    float userrating;
    @Column(name = "owner_responsetime")
    Date ownerresponsetime;
    @Column(name = "order_datetime")
    Date orderdatetime;
    boolean ownerresponded;

    @Column(columnDefinition = "boolean default false")
    boolean reviewdone;
}
