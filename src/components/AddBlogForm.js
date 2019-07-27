import React, { useState } from 'react';
import blogsService from '../services/blogs';

const AddBlogForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

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
            await blogsService
                .create({
                    title, author, url
                });
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (exception) {
            console.log('Blog creation failed');
        }
    };

    return (
        <>
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
        </>
    );
};

export default AddBlogForm;