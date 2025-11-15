package com.blog.service;

import com.blog.dto.SignupRequest;
import com.blog.dto.UserDto;

public interface AuthService {
    UserDto signupUser(SignupRequest signupRequest);
}
