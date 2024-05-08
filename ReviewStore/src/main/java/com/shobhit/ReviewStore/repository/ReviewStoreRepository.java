package com.shobhit.ReviewStore.repository;

import com.shobhit.ReviewStore.entity.ReviewStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewStoreRepository extends JpaRepository<ReviewStore, Long> {
    List<ReviewStore> findByProductidOrderByDatetimeDesc(String id);
}
