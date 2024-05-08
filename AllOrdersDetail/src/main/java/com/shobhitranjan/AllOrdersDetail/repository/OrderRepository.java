package com.shobhitranjan.AllOrdersDetail.repository;

import com.shobhitranjan.AllOrdersDetail.entity.AllOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<AllOrders, Long> {
    List<AllOrders> findByProductownerid(String s);

    List<AllOrders> findByUserid(String s);
}
