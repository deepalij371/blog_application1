package com.blog.dto;

import lombok.Data;

@Data
public class SignupRequest {

    private String userName;
    private String email;
    private String password;
}
