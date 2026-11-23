package com.deepika.communityhub.controller;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deepika.communityhub.entity.User;
import com.deepika.communityhub.repository.UserRepository;
import com.deepika.communityhub.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

	@Autowired
	private UserService userService;

    UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
	
	@PostMapping("/register")
	public User registerUser(@RequestBody User user) {
		return userService.saveUser(user);
	}
	
	@GetMapping
	public List<User> getAllUsers(){
		return userService.getAllUsers();
	}
	@GetMapping("/{id}")
	public User getUserById(@PathVariable Long id) {
	    return userService.getUserById(id);
	}
	@PutMapping("/{id}")
	public User updateUser(@PathVariable Long id, @RequestBody User user) {
	    return userService.updateUser(id, user);
	}
	@DeleteMapping("/{id}")
	public String deleteUser(@PathVariable Long id) {
	    userService.deleteUser(id);
	    return "User Deleted Successfully";
	}
	
	@GetMapping("/me")
	public User getCurrentUser(Authentication authentication) {
		String email = authentication.getName();
		return userRepository.findByEmail(email)
				.orElseThrow(()-> new RuntimeException("User not found"));
	}
}
