package com.shobhitranjan.CloudGateway.filters;

import java.util.List;
import java.util.function.Predicate;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class RoutValidator {
    public static final List<String> openApiEndpoints = List.of("/api/v1/auth/signin","/api/v1/auth/signup","/api/v1/auth/refresh","/api/v1/auth/validate-token",
            "/eureka","/product/image/","/product/all","/product/pincode", "/product/findbyproductid","/contact/sendreq");

    public Predicate<ServerHttpRequest> isSecured = request -> openApiEndpoints.stream()
            .noneMatch(uri -> request.getURI().getPath().contains(uri));
}
