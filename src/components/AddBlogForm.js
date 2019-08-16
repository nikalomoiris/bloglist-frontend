import React, { useState } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Togglable from './Togglable';
import { showError, showInfo, hideNotification } from '../reducers/NotificationReducer'
import { addBlog } from '../reducers/BlogReducer'

const AddBlogForm = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const blogFormRef = React.createRef();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handleCreateBlog = async (event) => {
        event.preventDefault();
        try {
            blogFormRef.current.toggleVisibility();
            props.addBlog({
                title, author, url
            });
            props.showInfo(`a new blog ${title} ${author} added`)
            setTimeout(() => {
                props.hideNotification()
            }, 5000);
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (exception) {
            props.showError('error while adding a new blog')
            console.log(exception);
            setTimeout(() => {
                props.hideNotification()
            }, 5000);
        }
    };

    return (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <Form onSubmit={handleCreateBlog}>
                <Form.Group controlId="formBlogTitle">
                    <Form.Label>Blog title</Form.Label>
                    <Form.Control type="text"
                        value={title} onChange={handleTitleChange}
                        placeholder="Enter blog title" />
                </Form.Group>
                {/* <div>
                    title: <input value={title} onChange={handleTitleChange} />
                </div> */}
                <Form.Group controlId="formBlogAthor">
                    <Form.Label>Blog author</Form.Label>
                    <Form.Control type="text"
                        value={author} onChange={handleAuthorChange}
                        placeholder="Enter blog author" />
                </Form.Group>
                {/* <div>
                    author: <input value={author} onChange={handleAuthorChange} />
                </div> */}
                <Form.Group controlId="formBlogUrl">
                    <Form.Label>Blog url</Form.Label>
                    <Form.Control type="text"
                        value={url} onChange={handleUrlChange}
                        placeholder="Enter blog url" />
                </Form.Group>
                {/* <div>
                    url: <input value={url} onChange={handleUrlChange} />
                </div> */}
                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
        </Togglable>
    );
};

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    showError,
    showInfo,
    hideNotification,
    addBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlogForm);