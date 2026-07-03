package com.deepika.communityhub.service;

import java.util.List;

import com.deepika.communityhub.entity.Post;
import com.deepika.communityhub.entity.User;
import com.deepika.communityhub.repository.PostRepository;
import com.deepika.communityhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deepika.communityhub.entity.Comment;
import com.deepika.communityhub.repository.CommentRepository;

@Service
public class CommentService {
	
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	public Comment saveComment(Long userId, Long postId, Comment comment) {
		  User user = userRepository.findById(userId).orElse(null);
		    Post post = postRepository.findById(postId).orElse(null);

		    if (user != null && post != null) {
		        comment.setUser(user);
		        comment.setPost(post);

		        return commentRepository.save(comment);
		    }

		    return null;
	}
	
	public List<Comment> getAllComments(){
		return commentRepository.findAll();
	}
	
	public Comment getCommentById(Long id) {
		return commentRepository.findById(id).orElse(null);
	}
	
	public Comment updateComment(Long id, Comment comment) {
		Comment existingComment = commentRepository.findById(id).orElse(null);
		 if (existingComment != null) {
	            existingComment.setContent(comment.getContent());
	            return commentRepository.save(existingComment);
	        }
		 return null;
	}
	
	public void deleteComment(Long id) {
		commentRepository.deleteById(id);
	}

}
