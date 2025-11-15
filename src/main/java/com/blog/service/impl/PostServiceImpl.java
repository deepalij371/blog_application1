package com.blog.service.impl;

import com.blog.dto.PostDto;
import com.blog.entity.Post;
import com.blog.repository.PostRepository;
import com.blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public PostDto createPost(PostDto postDto) {
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setUserId(postDto.getUserId());
        Post createdPost = postRepository.save(post);
        return mapToDto(createdPost);
    }

    @Override
    public List<PostDto> getAllPosts() {
        return postRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public PostDto getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        return mapToDto(post);
    }

    @Override
    public PostDto updatePost(PostDto postDto) {
        Post post = postRepository.findById(postDto.getId()).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        Post updatedPost = postRepository.save(post);
        return mapToDto(updatedPost);
    }

    @Override
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    private PostDto mapToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setContent(post.getContent());
        postDto.setUserId(post.getUserId());
        return postDto;
    }
}
