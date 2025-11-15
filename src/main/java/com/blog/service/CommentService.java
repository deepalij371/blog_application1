package com.blog.service;

import com.blog.dto.CommentDto;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto);
    CommentDto updateComment(CommentDto commentDto);
    void deleteComment(Long id);
}
