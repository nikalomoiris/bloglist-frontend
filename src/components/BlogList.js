import React from 'react';
import { connect } from 'react-redux';
import AddBlogForm from './AddBlogForm'
import Blog from './Blog'

const BlogList = (props) => {
    return (
        <>
            <AddBlogForm />
            {props.blogs
                .sort((a, b) => Number(b.likes) - Number(a.likes))
                .map(blog => <Blog key={blog.id}
                    blog={blog}
                    username={blog.user.username}
                    loggedUser={props.user.username} />)}
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