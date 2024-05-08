package com.allhomekitchenUsers.ContactRequest.conroller;

import com.allhomekitchenUsers.ContactRequest.dao.RequestContact;
import com.allhomekitchenUsers.ContactRequest.service.ContactService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/sendreq")
    public String sendingContactRequest(@RequestBody RequestContact requestContact){
        log.info("Sending Contact Request!!");
        contactService.sendingContactRequest(requestContact);
        log.info("Contact sent successfully !!");
        return "request sent successfully";
    }
}
