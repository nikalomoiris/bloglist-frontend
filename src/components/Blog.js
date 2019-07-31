import React, { useState } from 'react';
import blogsService from '../services/blogs';

const Blog = ({ blogs,
    setBlogs,
    blogId,
    title,
    author,
    url,
    likes,
    username,
    userId,
    loggedUser }) => {
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
    const removeButtonVisibility = {
        display: loggedUser === username ? '' : 'none'
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

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

    const handleDelete = async (event) => {
        event.preventDefault();
        if (window.confirm(`remove blog ${title} by ${author}`)) {
            try {
                await blogsService.deleteBlog(blogId);
                setBlogs(blogs.filter(blog => blog.id !== blogId));
            } catch (exception) {
                console.log('remove blog failed');
            }
        }
    };

    return (
        <div style={blogStyle}>
            <div className='title' onClick={toggleVisibility} style={hideWhenVisible}>
                {title} {author}
            </div>
            <div style={showWhenVisible} className='blogDetails'>
                <div onClick={toggleVisibility}>{title} {author}</div>
                <div>{url}</div>
                <div>{blogLikes} likes <button onClick={increaseLikes}>like</button></div>
                <div>added by {username}</div>
                <button style={removeButtonVisibility} onClick={handleDelete}>remove</button>
            </div>
        </div>
    );
};

export default Blog;