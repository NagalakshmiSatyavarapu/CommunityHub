package com.deepika.communityhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deepika.communityhub.dto.LoginRequest;
import com.deepika.communityhub.dto.LoginResponse;
import com.deepika.communityhub.dto.RegisterRequest;
import com.deepika.communityhub.entity.User;
import com.deepika.communityhub.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired  
	private AuthService authService;
	  
	@PostMapping("/register")
	public User register(@RequestBody RegisterRequest request) {

	    System.out.println("Username = " + request.getUsername());

	    return authService.register(request);
//		return authService.register(request);
	}
	
	@PostMapping("/login")
	public LoginResponse login(@RequestBody LoginRequest request) {

	    System.out.println("🔥 Login API Hit");

	    return authService.login(request);
	}
}
