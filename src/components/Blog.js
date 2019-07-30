import React, { useState } from 'react';
import blogsService from '../services/blogs';

const Blog = ({ blogId, title, author, url, likes, user, userId }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const [blogLikes, setBlogLikes] = useState(likes);
    const [visible, setVisible] = useState(false);

    const showWhenVisible = { display: visible ? '' : 'none' };
    const hideWhenVisible = { display: visible ? 'none' : '' };

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    const increaseLikes = async (event) => {
        event.preventDefault();
        try {
            await blogsService
                .update({
                    user: userId,
                    likes: ++likes,
                    author,
                    title,
                    url
                }, blogId);
            setBlogLikes(likes);
        } catch (exception) {
            console.log('likes update failed');
        }
    };

    return (
        <div style={blogStyle}>
            <div onClick={toggleVisibility} style={hideWhenVisible}>
                {title} {author}
            </div>
            <div style={showWhenVisible}>
                <div onClick={toggleVisibility}>{title} {author}</div>
                <div>{url}</div>
                <div>{blogLikes} likes <button onClick={increaseLikes}>like</button></div>
                <div>added by {user}</div>
            </div>
        </div>
    );
};

export default Blog;