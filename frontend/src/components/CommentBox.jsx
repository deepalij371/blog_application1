import React from 'react';

const CommentBox = ({ comment }) => {
    return (
        <div>
            <p>{comment.content}</p>
        </div>
    );
};

export default CommentBox;
