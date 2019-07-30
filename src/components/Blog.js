import React, { useState } from 'react';

const Blog = ({ title, author, url, likes, user }) => {
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

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    return (
        <div style={blogStyle}>
            <div onClick={toggleVisibility} style={hideWhenVisible}>
                {title} {author}
            </div>
            <div onClick={toggleVisibility} style={showWhenVisible}>
                <div>{title} {author}</div>
                <div>{url}</div>
                <div>added by {user}</div>
            </div>
        </div>
    );
};

export default Blog;