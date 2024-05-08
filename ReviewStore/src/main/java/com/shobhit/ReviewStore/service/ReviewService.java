package com.shobhit.ReviewStore.service;

import com.shobhit.ReviewStore.dao.RequestData;
import com.shobhit.ReviewStore.entity.ReviewStore;

import java.util.List;

public interface ReviewService {
   void saveReview(RequestData requestData);

    List<ReviewStore> getAllReviewOfProduct(String id);
}
