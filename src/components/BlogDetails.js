import React from 'react'
import { connect } from 'react-redux'
import { addBlog, deleteBlog, like } from '../reducers/BlogReducer'

const BlogDetails = (props) => {
    const blog = props.blog
    const username = blog.user.username
    const loggedUser = props.user.username

    const removeButtonVisibility = {
        display: loggedUser === username ? '' : 'none'
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
        <div className='blogDetails'>
            <h2>{blog.title} {blog.author}</h2>
            <div>{blog.url}</div>
            <div>{blog.likes} likes <button onClick={increaseLikes}>like</button></div>
            <div>added by {username}</div>
            <button style={removeButtonVisibility} onClick={handleDelete}>remove</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user
    }
}

const mapDispatchToProps = {
    addBlog,
    deleteBlog,
    like
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails)