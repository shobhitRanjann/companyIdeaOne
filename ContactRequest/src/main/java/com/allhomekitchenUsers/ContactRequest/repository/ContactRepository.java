package com.allhomekitchenUsers.ContactRequest.repository;

import com.allhomekitchenUsers.ContactRequest.entity.Contacts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contacts, Long> {
}
