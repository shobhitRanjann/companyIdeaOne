package com.shobhitranjan.AddProduct.interceptor;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@Log4j2
public class FeignClientInterceptor implements RequestInterceptor {

    private static final String AUTHORIZATION_HEADER = "Authorization";

    public static String getBearerTokenHeader() {
        log.info("getting bearer token header : "+((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getHeader("Authorization"));
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getHeader("Authorization");
    }

    @Override
    public void apply(RequestTemplate requestTemplate) {
        requestTemplate.header(AUTHORIZATION_HEADER, getBearerTokenHeader());
    }
}
