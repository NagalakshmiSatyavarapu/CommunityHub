package com.deepika.communityhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deepika.communityhub.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{

}