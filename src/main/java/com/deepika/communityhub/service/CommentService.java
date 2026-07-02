package com.deepika.communityhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deepika.communityhub.entity.Comment;
import com.deepika.communityhub.repository.CommentRepository;

@Service
public class CommentService {
	
	@Autowired
	private CommentRepository commentRepository;
	
	public Comment saveComment(Comment comment) {
		return commentRepository.save(comment);
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
