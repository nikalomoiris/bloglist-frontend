import React, { useState } from 'react';
import blogsService from '../services/blogs';
import Togglable from './Togglable';

const AddBlogForm = ({ setNotificationMessage,
    setNotifType,
    blogs,
    setBlogs }) => {
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
            const returnedBlog = await blogsService
                .create({
                    title, author, url
                });
            setBlogs(blogs.concat(returnedBlog));
            setNotificationMessage(`a new blog ${title} ${author} added`);
            setNotifType('info');
            setTimeout(() => {
                setNotificationMessage(null);
                setNotifType(null);
            }, 5000);
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (exception) {
            setNotificationMessage('error while adding a new blog');
            setNotifType('error');
            console.log(exception);
            setTimeout(() => {
                setNotificationMessage(null);
                setNotifType(null);
            }, 5000);
        }
    };

    return (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    title: <input value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    author: <input value={author} onChange={handleAuthorChange} />
                </div>
                <div>
                    url: <input value={url} onChange={handleUrlChange} />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </Togglable>
    );
};

export default AddBlogForm;