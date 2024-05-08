package com.shobhit.ReviewStore.service.impl;

import com.shobhit.ReviewStore.dao.RequestData;
import com.shobhit.ReviewStore.entity.ReviewStore;
import com.shobhit.ReviewStore.external.client.OrderDetails;
import com.shobhit.ReviewStore.repository.ReviewStoreRepository;
import com.shobhit.ReviewStore.service.ReviewService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    ReviewStoreRepository reviewStoreRepository;

    @Autowired
    OrderDetails orderDetails;
    @Override
    public void saveReview(RequestData requestData) {
        try{
            orderDetails.reviewupdater(requestData.getOrderid());
        }catch (Exception e){
            log.info("order details is down with order id "+requestData.getOrderid());
            return;
        }

        ReviewStore reviewStore = ReviewStore.builder()
                .productid(requestData.getProductid())
                .orderid(requestData.getOrderid())
                .stars(requestData.getStars())
                .comment(requestData.getComment())
                .user(requestData.getUsername())
                .datetime(Date.from(Instant.now()))
                .build();
        reviewStoreRepository.save(reviewStore);
    }

    @Override
    public List<ReviewStore> getAllReviewOfProduct(String id) {
        return reviewStoreRepository.findByProductidOrderByDatetimeDesc(id);
    }
}
