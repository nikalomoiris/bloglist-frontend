import React from 'react'
import { connect } from 'react-redux'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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
        <Card className='blogDetails'>
            <Card.Body>
                <Card.Title>{blog.title} by {blog.author}</Card.Title>
                <Card.Text>
                    <div>{blog.url}</div>
                    <div>
                        {blog.likes} likes
                        <Button variant="success"
                            size='sm'
                            onClick={increaseLikes}>like
                        </Button>
                    </div>
                    <div>added by {username}</div>
                </Card.Text>
                <Button variant="danger"
                    size='sm'
                    style={removeButtonVisibility}
                    onClick={handleDelete}>Delete</Button>
            </Card.Body>
        </Card>
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