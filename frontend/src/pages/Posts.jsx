import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <Link to="/create-post">Create Post</Link>
            {posts.map((post) => (
                <Link to={`/posts/${post.id}`} key={post.id}>
                    <PostCard post={post} />
                </Link>
            ))}
        </div>
    );
};

export default Posts;
