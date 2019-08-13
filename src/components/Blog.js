import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addBlog, deleteBlog, like } from '../reducers/BlogReducer'

const Blog = (props) => {
    const blog = props.blog;

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const [visible, setVisible] = useState(false);

    const showWhenVisible = { display: visible ? '' : 'none' };
    const hideWhenVisible = { display: visible ? 'none' : '' };
    const removeButtonVisibility = {
        display: props.loggedUser === props.username ? '' : 'none'
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const increaseLikes = async (event) => {
        event.preventDefault();
        try {
            props.like({
                user: blog.user.id,
                likes: ++blog.likes,
                author: blog.author,
                title: blog.title,
                url: blog.url
            }, blog.id);
        } catch (exception) {
            console.log('likes update failed ', exception);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
            try {
                props.deleteBlog(blog.id)
            } catch (exception) {
                console.log('remove blog failed');
            }
        }
    };

    return (
        <div style={blogStyle}>
            <div className='title' onClick={toggleVisibility} style={hideWhenVisible}>
                {blog.title} {blog.author}
            </div>
            <div style={showWhenVisible} className='blogDetails'>
                <div onClick={toggleVisibility}>{blog.title} {blog.author}</div>
                <div>{blog.url}</div>
                <div>{blog.likes} likes <button onClick={increaseLikes}>like</button></div>
                <div>added by {props.username}</div>
                <button style={removeButtonVisibility} onClick={handleDelete}>remove</button>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    addBlog,
    deleteBlog,
    like
}

export default connect(null, mapDispatchToProps)(Blog);