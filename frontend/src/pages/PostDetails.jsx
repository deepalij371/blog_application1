import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentBox from '../components/CommentBox';

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/${id}`);
            navigate('/');
        } catch (error) {
            alert('Failed to delete post!');
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/comments', { content, postId: id });
            // Refresh comments
        } catch (error) {
            alert('Failed to create comment!');
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <Link to={`/edit-post/${id}`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>

            <form onSubmit={handleCommentSubmit}>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Add a comment" />
                <button type="submit">Comment</button>
            </form>

            {comments.map((comment) => (
                <CommentBox key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default PostDetails;
