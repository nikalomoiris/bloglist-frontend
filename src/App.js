import React, { useState, useEffect } from 'react';
import blogsService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';

function App() {
    const [user, setUser] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        async function fetchBlogs() {
            const initialBlogs = await blogsService.getAll();
            setBlogs(initialBlogs);
        }
        fetchBlogs();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username, password
            });

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            );

            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            console.log('Login Failed');
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogout = () => {
        setUser('');
        window.localStorage.clear();
    }

    if (user === '') {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Bloglist App</h1>
                </header>
                <LoginForm handleLogin={handleLogin}
                    username={username}
                    handleUsernameChange={handleUsernameChange}
                    password={password}
                    handlePasswordChange={handlePasswordChange} />
            </div>
        );
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>Bloglist App</h1>
            </header>
            <h2>Blogs</h2>
            <h3>{user.name} is logged in</h3>
            <button onClick={handleLogout}>Logout</button>
            {blogs.map(blog => <Blog key={blog.id} title={blog.title} author={blog.author} />)}
        </div>
    );
}

export default App;
