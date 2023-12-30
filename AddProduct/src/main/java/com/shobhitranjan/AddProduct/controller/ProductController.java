package com.shobhitranjan.AddProduct.controller;

import com.shobhitranjan.AddProduct.entity.AllProducts;
import com.shobhitranjan.AddProduct.exception.StorageFileNotFoundException;
import com.shobhitranjan.AddProduct.external.client.UserService;
import com.shobhitranjan.AddProduct.interceptor.FeignClientInterceptor;
import com.shobhitranjan.AddProduct.model.RequestData;
import com.shobhitranjan.AddProduct.model.ResponseData;
import com.shobhitranjan.AddProduct.service.JwtService;
import com.shobhitranjan.AddProduct.service.ProductService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
@Log4j2
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    public ProductController(ProductService storageService) {
        this.productService = storageService;
    }

    @GetMapping("/storedimages")
    public ResponseEntity<List<String>> listUploadedFiles(@RequestHeader("Authorization") String token, Model model) throws IOException {

        model.addAttribute("files", productService.loadAll().map(
                        path -> MvcUriComponentsBuilder.fromMethodName(ProductController.class,
                                "serveFile", path.getFileName().toString()).build().toUri().toString())
                .collect(Collectors.toList()));
        String s1 = token.substring(token.indexOf(" ") + 1);
        s1.trim();
        log.info("token :"+s1);
        log.info("token  : >>> "+jwtService.extractUserName(s1));
        log.info("calling FeignClientInterceptor :[] :   "+FeignClientInterceptor.getBearerTokenHeader());

        return ResponseEntity.ok(productService.loadAll().map(
                        path -> MvcUriComponentsBuilder.fromMethodName(ProductController.class,
                                "serveFile", path.getFileName().toString()).build().toUri().toString())
                .collect(Collectors.toList()));
    }

    @GetMapping("/")
    public ResponseEntity<Object> getAllProducts(){
        return ResponseEntity.ok(productService.getProducts());
    }

    @GetMapping("/files/{filename}")
    public ResponseEntity<Resource> serveFile(@PathVariable("filename") String filename) throws IOException {

        Resource file = productService.loadAsResource(filename);

        if (file == null)
            return ResponseEntity.notFound().build();

//        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
//                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
        return new ResponseEntity(file.getFile(),HttpStatus.OK);
    }

    @PostMapping("/")
    public String handleFileUpload(@RequestHeader("Authorization") String token, @RequestParam("file") List<MultipartFile> file, RequestData data) {
        log.info("token :: "+token);
        file.stream().forEach(i -> {log.info("file {}/:"+i.getOriginalFilename());});
        productService.store(file, token, data);
        file.stream().forEach(i -> {System.out.println("");});
        return "UPLOADED";
    }

    @GetMapping("/getProdUser")
    public long getUserId(@RequestParam("username")String username){
        log.info("getting userId from AddProduct :"+username);
        return userService.getUserIdByUsername(username);
    }

    @GetMapping("/userproduct")
    public ResponseEntity<Object> responseData(@RequestHeader("Authorization") String token){
        List<ResponseData> allProducts = productService.getAllProduct(token);
        return ResponseEntity.ok(allProducts);
    }

//    @PostMapping("/addProduct")
//    public ProductResponse addProduct(ProductRequest ){
//
//    }

    @GetMapping("image/{uId}/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String uId, @PathVariable String imageName) throws IOException {
        // Load the image as a Resource
       // pictures/uploads/6/Sample-jpg-image-100kb.png
        Path imagePath = Paths.get("pictures/uploads/"+ uId+"/"+ imageName);
        Resource resource = new UrlResource(imagePath.toUri());

        // Return the image with proper headers
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=" + resource.getFilename())
                .contentType(MediaType.IMAGE_PNG)
                .body(resource);
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
}
