package com.deepika.communityhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.deepika.communityhub.service.LikeService;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/posts/{postId}/users/{userId}")
    public String toggleLike(
            @PathVariable Long postId,
            @PathVariable Long userId) {

        return likeService.toggleLike(userId, postId);
    }

    @GetMapping("/posts/{postId}/count")
    public long getLikeCount(@PathVariable Long postId) {

        return likeService.getLikeCount(postId);
    }
}