package com.deepika.communityhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.deepika.communityhub.entity.Comment;
import com.deepika.communityhub.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Create Comment
    @PostMapping("/posts/{postId}/users/{userId}")
    public Comment createComment(@PathVariable Long postId,
                                 @PathVariable Long userId,
                                 @RequestBody Comment comment) {

        return commentService.saveComment(userId, postId, comment);
    }
    // Get All Comments
    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    // Get Comment By Id
    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    // Update Comment
    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id,
                                 @RequestBody Comment comment) {
        return commentService.updateComment(id, comment);
    }

    // Delete Comment
    @DeleteMapping("/{id}")
    public String deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return "Comment Deleted Successfully";
    }
}