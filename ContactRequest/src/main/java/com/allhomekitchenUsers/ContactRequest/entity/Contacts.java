package com.allhomekitchenUsers.ContactRequest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Table(name = "hk_contacts")
@Builder
public class Contacts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    String username;
    String title;
    String description;
    String location;
    String pinCode;
}
