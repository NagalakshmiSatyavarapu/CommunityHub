package com.deepika.communityhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deepika.communityhub.entity.Post;
import com.deepika.communityhub.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {
@Autowired
private PostService postService;

@PostMapping("/user/{userId}")
public Post createPost(@PathVariable Long userId, @RequestBody Post post) {
    return postService.savePost(userId, post);
}
@GetMapping
public List<Post> getAllPosts() {
    return postService.getAllPosts();
}
@GetMapping("/{id}")
public Post getPostById(@PathVariable Long id) {
    return postService.getPostById(id);
}
@PutMapping("/{id}")
public Post updatePost(@PathVariable Long id, @RequestBody Post post) {
    return postService.updatePost(id, post);
}
@DeleteMapping("/{id}")
public String deletePost(@PathVariable Long id) {
    postService.deletePost(id);
    return "Post Deleted Successfully";
}

}
