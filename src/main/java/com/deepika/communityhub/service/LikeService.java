package com.deepika.communityhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deepika.communityhub.entity.Like;
import com.deepika.communityhub.entity.Post;
import com.deepika.communityhub.entity.User;
import com.deepika.communityhub.repository.LikeRepository;
import com.deepika.communityhub.repository.PostRepository;
import com.deepika.communityhub.repository.UserRepository;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public String toggleLike(Long userId, Long postId) {

        var existingLike =
                likeRepository.findByUserIdAndPostId(userId, postId);

        if (existingLike.isPresent()) {

            likeRepository.delete(existingLike.get());

            return "Post unliked";
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Like like = new Like();

        like.setUser(user);
        like.setPost(post);

        likeRepository.save(like);

        return "Post liked";
    }

    public long getLikeCount(Long postId) {
        return likeRepository.countByPostId(postId);
    }
}