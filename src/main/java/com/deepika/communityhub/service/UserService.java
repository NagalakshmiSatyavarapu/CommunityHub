package com.deepika.communityhub.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deepika.communityhub.entity.User;
import com.deepika.communityhub.repository.UserRepository;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;
  public User saveUser(User user) {
	  return userRepository.save(user);
  }
  
  public List<User> getAllUsers(){
	  return userRepository.findAll();
  }
  
  public User getUserById(Long id) {
	    return userRepository.findById(id).orElse(null);
	}
  public User updateUser(Long id, User user) {
	    User existingUser = userRepository.findById(id).orElse(null);

	    if (existingUser != null) {
	        existingUser.setFirstName(user.getFirstName());
	        existingUser.setLastName(user.getLastName());
	        existingUser.setUsername(user.getUsername());
	        existingUser.setEmail(user.getEmail());
	        existingUser.setPassword(user.getPassword());

	        return userRepository.save(existingUser);
	    }

	    return null;
	}
  public void deleteUser(Long id) {
	    userRepository.deleteById(id);
	}

 
}
