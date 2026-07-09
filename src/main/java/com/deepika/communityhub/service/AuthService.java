package com.deepika.communityhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.deepika.communityhub.controller.PostController;
import com.deepika.communityhub.dto.RegisterRequest;
import com.deepika.communityhub.entity.User;
import com.deepika.communityhub.repository.UserRepository;

@Service
public class AuthService {

    
    
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder  passwordEncoder;

  
	public User register(RegisterRequest request) {
		User user = new User();
		
		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		
		return userRepository.save(user);
	}
	
}
