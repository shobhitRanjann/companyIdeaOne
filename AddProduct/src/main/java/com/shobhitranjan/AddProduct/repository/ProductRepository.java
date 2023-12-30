package com.shobhitranjan.AddProduct.repository;

import com.shobhitranjan.AddProduct.entity.AllProducts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<AllProducts, Long> {
    @Override
    Optional<AllProducts> findById(Long aLong);

    List<AllProducts> findByUserId(long idUser);
}
