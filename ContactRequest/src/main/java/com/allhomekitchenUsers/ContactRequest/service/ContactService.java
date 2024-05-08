package com.allhomekitchenUsers.ContactRequest.service;

import com.allhomekitchenUsers.ContactRequest.dao.RequestContact;

public interface ContactService {
    String sendingContactRequest(RequestContact requestContact);
}
