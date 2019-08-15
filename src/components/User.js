import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
    if (props.user === undefined) {
        return null
    }
    const blogs = props.user.blogs
    const name = props.user.name
    return (
        <>
            <h2>{name}</h2>
            <h3>added blogs</h3>
            <ul>
                {blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </>
    )
}

export default connect()(User)