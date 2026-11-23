package com.deepika.communityhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deepika.communityhub.entity.Post;
import com.deepika.communityhub.entity.User;
import com.deepika.communityhub.repository.PostRepository;
import com.deepika.communityhub.repository.UserRepository;

@Service
public class PostService {
	
@Autowired
private UserRepository userRepository;
 @Autowired
 private PostRepository postRepository;
 public Post savePost(Long userId, Post post) {

	    User user = userRepository.findById(userId).orElse(null);

	    if (user != null) {
	        post.setUser(user);
	        return postRepository.save(post);
	    }

	    return null;
	}
 public List<Post> getAllPosts() {
	    return postRepository.findAll();
	}
 public Post getPostById(Long id) {
	    return postRepository.findById(id).orElse(null);
	}
 
 public Post updatePost(Long id, Post post) {

	    Post existingPost = postRepository.findById(id).orElse(null);

	    if (existingPost != null) {
	        existingPost.setTitle(post.getTitle());
	        existingPost.setContent(post.getContent());

	        return postRepository.save(existingPost);
	    }

	    return null;
	}
 
 public void deletePost(Long id) {
	    postRepository.deleteById(id);
	}
}
