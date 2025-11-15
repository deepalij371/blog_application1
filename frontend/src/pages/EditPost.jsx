import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/posts', { id, title, content });
            navigate(`/posts/${id}`);
        } catch (error) {
            alert('Failed to update post!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
            <button type="submit">Update</button>
        </form>
    );
};

export default EditPost;
