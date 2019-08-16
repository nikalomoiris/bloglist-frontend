import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const Blog = (props) => {
    const blog = props.blog;

    return (
        <Link className='title' to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
        </Link>
    );
};

export default connect()(Blog);