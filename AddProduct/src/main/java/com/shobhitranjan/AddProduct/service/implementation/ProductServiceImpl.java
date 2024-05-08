package com.shobhitranjan.AddProduct.service.implementation;

import com.shobhitranjan.AddProduct.entity.AllProducts;
import com.shobhitranjan.AddProduct.exception.StorageException;
import com.shobhitranjan.AddProduct.exception.StorageFileNotFoundException;
import com.shobhitranjan.AddProduct.external.client.UserService;
import com.shobhitranjan.AddProduct.imgStorageConfig.StorageProperties;
import com.shobhitranjan.AddProduct.model.RequestData;
import com.shobhitranjan.AddProduct.model.ResponseData;
import com.shobhitranjan.AddProduct.repository.ProductRepository;
import com.shobhitranjan.AddProduct.service.JwtService;
import com.shobhitranjan.AddProduct.service.ProductService;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.time.InstantSource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;
import org.springframework.core.io.UrlResource;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService {

    private Path rootLocation;

    private final Path finalRootLocation;
    StorageProperties properties;

    JwtService jwtService;

    UserService userService;

    private final ProductRepository productRepository;


    @Autowired
    public ProductServiceImpl(StorageProperties properties, ProductRepository productRepository, UserService userService, JwtService jwtService, StorageProperties storageProperties) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.jwtService = jwtService;
        this.properties = storageProperties;

        if(properties.getLocation().trim().isEmpty()){
            throw new StorageException("File upload location can not be Empty.");
        }
        this.finalRootLocation = Paths.get(properties.getLocation());
        this.rootLocation = Paths.get(properties.getLocation());
    }

    public void store(List<MultipartFile> files, String token, RequestData data) {
        long idUser = 0;
        if(token != null)
            idUser = getUserId(token);

        log.info("userId from ProductServiceImpl ::"+idUser);
        try {
            List<String> productList= new ArrayList<>();
            for(MultipartFile file: files) {
                log.info("conversion complete");
                if (file.isEmpty()) {
                    throw new StorageException("Failed to store empty file.");
                }
                if(this.rootLocation != this.finalRootLocation ){
                    this.rootLocation = this.finalRootLocation;
                }
                log.info("rootLocation and Absolute Path "+this.rootLocation+"/"+idUser );
                if(this.rootLocation.endsWith("uploads")){
                    this.rootLocation = Paths.get(this.rootLocation+"/"+idUser);
                }
                String str = RandomStringUtils.randomAlphanumeric(10).toLowerCase();
                Path destinationFile = this.rootLocation.resolve(
                                Paths.get(str+file.getOriginalFilename()))
                        .normalize().toAbsolutePath();
                if(!Files.exists(this.rootLocation)) {
                    Files.createDirectories(this.rootLocation);
                }
                log.info("desination File parent :: "+destinationFile.getParent() +" <> "+this.rootLocation.toAbsolutePath());
                if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                    // This is a security check
                    throw new StorageException(
                            "Cannot store file outside current directory.");
                }
                try (InputStream inputStream = file.getInputStream()) {
                    Files.copy(inputStream, destinationFile,
                            StandardCopyOption.REPLACE_EXISTING);
                }
                log.info("getFileName :: "+destinationFile.getFileName() +"   :: "+destinationFile.toString());
                String destFile =  destinationFile.getParent().toString().replace("/", " ");
                log.info("s1  :: "+destFile);
                productList.add(destinationFile.toString());
            }
            AllProducts allProducts = AllProducts.builder()
                    .userId(idUser)
                    .productName(data.productName)
                    .productLocalName(data.productLocalName)
                    .productType(data.productType)
                    .productDescription(data.productDescription)
                    .productPrice(data.productPrice)
                    .productStatus(data.productStatus)
                    .productState(data.productState)
                    .productCity(data.productCity)
                    .productLocation(data.productUserLocation)
                    .userPinCode(data.userPinCode)
                    .productImageAvailable(true)
                    .productImagePath(productList)
                    .build();
            productRepository.save(allProducts);
            System.out.println(productList);
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        }
        catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }


    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + filename);

            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }


    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public List<ResponseData> getAllProduct(String token) {
        long idUser = 0;
        if(token != null)
            idUser = getUserId(token);


        List<AllProducts> allProduct = productRepository.findByUserId(idUser);
        List<ResponseData> responseData = new ArrayList<>();
        log.info("getAllProducts  :: "+allProduct);
        for (AllProducts allProducts : allProduct) {
            ResponseData res = ResponseData.builder()
                    .productId(allProducts.getProductId())
                    .productName(allProducts.getProductName())
                    .productLocalName(allProducts.getProductLocalName())
                    .productType(allProducts.getProductType())
                    .productDescription(allProducts.getProductDescription())
                    .productPrice(allProducts.getProductPrice())
                    .productStatus(allProducts.getProductStatus())
                    .productState(allProducts.getProductState())
                    .productCity(allProducts.getProductCity())
                    .productUserLocation(allProducts.getProductLocation())
                    .productImagePath(allProducts.getProductImagePath())
                    .userPinCode(allProducts.getUserPinCode())
                    .productUserid(String.valueOf(allProducts.getUserId()))
                    .build();
            log.info("res :: "+res);
            responseData.add(res);
        }
        return responseData;
    }

    @Override
    public List<ResponseData> getProducts() {
        List<AllProducts> allProduct = productRepository.findAll();
        List<ResponseData> responseData = new ArrayList<>();
        log.info("getAllProducts  :: "+allProduct);
        for (AllProducts allProducts : allProduct) {
            ResponseData res = ResponseData.builder()
                    .productId(allProducts.getProductId())
                    .productName(allProducts.getProductName())
                    .productLocalName(allProducts.getProductLocalName())
                    .productType(allProducts.getProductType())
                    .productDescription(allProducts.getProductDescription())
                    .productPrice(allProducts.getProductPrice())
                    .productStatus(allProducts.getProductStatus())
                    .productState(allProducts.getProductState())
                    .productCity(allProducts.getProductCity())
                    .productUserLocation(allProducts.getProductLocation())
                    .userPinCode(allProducts.getUserPinCode())
                    .productImagePath(allProducts.getProductImagePath())
                    .productUserid(String.valueOf(allProducts.getUserId()))
                    .build();
            log.info("res :: "+res);
            responseData.add(res);
        }
        return responseData;

    }

    @Override
    public List<ResponseData> getAllProductOfThisPinCode(int pinCode) {
        List<AllProducts> allProduct = productRepository.findByUserPinCode(pinCode);
        List<ResponseData> responseData = new ArrayList<>();
        log.info("getAllProducts of pin code  :: "+pinCode);
        for (AllProducts allProducts : allProduct) {
            ResponseData res = ResponseData.builder()
                    .productId(allProducts.getProductId())
                    .productName(allProducts.getProductName())
                    .productLocalName(allProducts.getProductLocalName())
                    .productType(allProducts.getProductType())
                    .productDescription(allProducts.getProductDescription())
                    .productPrice(allProducts.getProductPrice())
                    .productStatus(allProducts.getProductStatus())
                    .productState(allProducts.getProductState())
                    .productCity(allProducts.getProductCity())
                    .productUserLocation(allProducts.getProductLocation())
                    .userPinCode(allProducts.getUserPinCode())
                    .productImagePath(allProducts.getProductImagePath())
                    .build();
            log.info("res :: "+res);
            responseData.add(res);
        }
        return responseData;
    }

    @Override
    public String updateProductById(List<MultipartFile> files, long id, RequestData data) {
        if(!productRepository.findById(id).isPresent()) {

                return "Not Saved";
        }

        try {
            log.info("finding by id "+id);
            AllProducts allProduct = productRepository.findById(id).get();
            log.info("id found  "+allProduct.getProductName() + "   of pincode  "+data.getUserPinCode());
            List<String> productList= new ArrayList<>();
            if(files != null ) {
                for (MultipartFile file : files) {
                    log.info("conversion complete");
                    if (file.isEmpty()) {
                        throw new StorageException("Failed to store empty file.");
                    }
                    if (this.rootLocation != this.finalRootLocation) {
                        this.rootLocation = this.finalRootLocation;
                    }
                    log.info("rootLocation and Absolute Path " + this.rootLocation + "/" + allProduct.getUserId());
                    if (this.rootLocation.endsWith("uploads")) {
                        this.rootLocation = Paths.get(this.rootLocation + "/" + allProduct.getUserId());
                    }
                    Path destinationFile = this.rootLocation.resolve(
                                    Paths.get(file.getOriginalFilename()))
                            .normalize().toAbsolutePath();
                    if (!Files.exists(this.rootLocation)) {
                        Files.createDirectories(this.rootLocation);
                    }
                    log.info("desination File parent :: " + destinationFile.getParent() + " <> " + this.rootLocation.toAbsolutePath());
                    if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                        // This is a security check
                        throw new StorageException(
                                "Cannot store file outside current directory.");
                    }
                    try (InputStream inputStream = file.getInputStream()) {
                        Files.copy(inputStream, destinationFile,
                                StandardCopyOption.REPLACE_EXISTING);
                    }
                    log.info("getFileName :: " + destinationFile.getFileName() + "   :: " + destinationFile.toString());
                    String destFile = destinationFile.getParent().toString().replace("/", " ");
                    log.info("s1  :: " + destFile);
                    productList.add(destinationFile.toString());
                }
            }

            //AllProducts allProducts = AllProducts.builder()
            if (data.productName != null) {
                allProduct.setProductName(data.productName);
            }
            if(data.productLocalName != null){
                allProduct.setProductLocalName(data.productLocalName);
            }
            if(data.productType != null){
                allProduct.setProductType(data.productType);
            }
            if(data.productDescription != null){
                allProduct.setProductDescription(data.productDescription);
            }
            if(data.productPrice != allProduct.getProductPrice()){
                allProduct.setProductPrice(data.productPrice);
            }
            if(data.productStatus != null){
                allProduct.setProductStatus(data.productStatus);
            }
            if(data.productState != null){
                allProduct.setProductState(data.productState);
            }
            if(data.productCity != null){
                allProduct.setProductCity(data.productCity);
            }
            if(data.productUserLocation != null){
                allProduct.setProductLocation(data.productUserLocation);
            }
            if(data.userPinCode != allProduct.getUserPinCode()){
                allProduct.setUserPinCode(data.userPinCode);
            }
            if(!productList.isEmpty()){
                allProduct.setProductImagePath(productList);
            }
           // allProduct.setProductImageAvailable(true);

            productRepository.save(allProduct);
            log.info("updating finished for user id ::"+id+":: in updateProductById()");
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
        return "updated";
    }

    @Override
    public String updateProductStatus(String id, String status) {
        try{
            if(productRepository.findById(Long.valueOf(id)).isPresent() && status != null && !status.isEmpty()){
                AllProducts allProduct = productRepository.findById(Long.valueOf(id)).get();
                allProduct.setProductStatus(status);
                productRepository.save(allProduct);
                return "updated";
            }

        }
        catch (Exception e){
            return e.toString();
        }
        return "not updated";
    }

    @Override
    public AllProducts findUserByProductId(String productid) {
        System.out.println("Hello  >> " +productid);
        return productRepository.findByProductId(Long.valueOf(productid));
    }

    @Override
    public AllProducts getProductByProductId(long id) {
        return productRepository.findByProductId(id);
    }


    public void init() {
        try {
            Files.createDirectories(rootLocation);
        }
        catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }

    public long getUserId(String token){
        String s1 = token.substring(token.indexOf(" ") + 1);
        s1.trim();
        log.info("token :"+s1);
        log.info("token  : >>> "+jwtService.extractUserName(s1));
        String username = jwtService.extractUserName(s1);
        return userService.getUserIdByUsername(username);
    }
}
