package com.shobhitranjan.AddProduct.service;

import com.shobhitranjan.AddProduct.entity.AllProducts;
import com.shobhitranjan.AddProduct.model.RequestData;
import com.shobhitranjan.AddProduct.model.ResponseData;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public interface ProductService {
    void init();

    void store(List<MultipartFile> file, String token, RequestData data);

    Stream<Path> loadAll();

    Path load(String filename);

    Resource loadAsResource(String filename);

    void deleteAll();

    List<ResponseData> getAllProduct(String token);

    List<ResponseData> getProducts();
}
