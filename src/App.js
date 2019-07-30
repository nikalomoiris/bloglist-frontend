import React, { useState, useEffect } from 'react';
import blogsService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';

function App() {
    const [user, setUser] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notifType, setNotifType] = useState('');

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

            blogsService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setNotificationMessage('Wrong password or username');
            setNotifType('error');
            setTimeout(() => {
                setNotificationMessage(null);
                setNotifType(null);
            }, 5000);
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
    };

    if (user === '') {
        return (
            <div className="App">
                <Notification message={notificationMessage} type={notifType} />
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
            <Notification message={notificationMessage} type={notifType} />
            <header className="App-header">
                <h1>Bloglist App</h1>
            </header>
            <h2>Blogs</h2>
            <div>
                <h3>{user.name} is logged in</h3>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <AddBlogForm setNotificationMessage={setNotificationMessage}
                setNotifType={setNotifType}
                blogs={blogs}
                setBlogs={setBlogs}/>
            {blogs.map(blog => <Blog key={blog.id} title={blog.title} author={blog.author} />)}
        </div>
    );
}

export default App;
