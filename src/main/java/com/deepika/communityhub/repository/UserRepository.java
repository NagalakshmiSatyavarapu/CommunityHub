package com.deepika.communityhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deepika.communityhub.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
