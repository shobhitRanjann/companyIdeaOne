package com.shobhit.ReviewStore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "hk_allreviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewStore {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String productid;
    String orderid;
    String stars;
    String comment;
    String user;
    Date datetime;
}
