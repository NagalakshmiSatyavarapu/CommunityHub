package com.deepika.communityhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deepika.communityhub.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

}
