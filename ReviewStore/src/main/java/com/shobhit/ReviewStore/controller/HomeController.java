package com.shobhit.ReviewStore.controller;

import com.shobhit.ReviewStore.dao.RequestData;
import com.shobhit.ReviewStore.entity.ReviewStore;
import com.shobhit.ReviewStore.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class HomeController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("/save")
    public ResponseEntity<?> saveReview(@RequestBody RequestData requestData){
        reviewService.saveReview(requestData);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<?> getAllReviewOfProductId(@PathVariable("id") String id){
        List<ReviewStore> reviews = reviewService.getAllReviewOfProduct(id);
        return ResponseEntity.ok(reviews);
    }
}