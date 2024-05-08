package com.allhomekitchenUsers.ContactRequest.service.impl;

import com.allhomekitchenUsers.ContactRequest.dao.RequestContact;
import com.allhomekitchenUsers.ContactRequest.entity.Contacts;
import com.allhomekitchenUsers.ContactRequest.repository.ContactRepository;
import com.allhomekitchenUsers.ContactRequest.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    ContactRepository contactRepository;

    @Override
    public String sendingContactRequest(RequestContact requestContact) {
        Contacts contact = Contacts.builder()
                .username(requestContact.getUsername())
                .title(requestContact.getTitle())
                .description(requestContact.getMessage())
                .pinCode(requestContact.getPinCode())
                .location(requestContact.getLocation())
                .build();
        contactRepository.save(contact);
        return "sent";
    }
}
