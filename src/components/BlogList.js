import React from 'react';
import { connect } from 'react-redux';

import ListGroup from 'react-bootstrap/ListGroup'

import AddBlogForm from './AddBlogForm'
import Blog from './Blog'

const BlogList = (props) => {
    return (
        <>
            <AddBlogForm />
            <ListGroup>
                {props.blogs
                    .sort((a, b) => Number(b.likes) - Number(a.likes))
                    .map(blog =>
                        <ListGroup.Item>
                            <Blog key={blog.id}
                                blog={blog}
                                username={blog.user.username}
                                loggedUser={props.user.username} />
                        </ListGroup.Item>)}
            </ListGroup>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.users.user
    }
}

export default connect(mapStateToProps)(BlogList)