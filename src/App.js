import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import loginService from './services/login';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';
import { showError, hideNotification } from './reducers/NotificationReducer'
import { initializeBlogs } from './reducers/BlogReducer'
import { isLoggedIn, login, logout } from './reducers/UserReducer'

function App(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        props.initializeBlogs()
    }, [])

    useEffect(() => {
        props.isLoggedIn()
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username, password
            });

            props.login(user)
            setUsername('');
            setPassword('');
        } catch (exception) {
            props.showError('Wrong password or username')
           setTimeout(() => {
                props.hideNotification()
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
        props.logout()
    };

    if (props.user === '') {
        return (
            <div className="App">
                <Notification message={props.notificationMessage}
                    type={props.notificationType} />
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
            <Notification message={props.notificationMessage}
                type={props.notificationType} />
            <header className="App-header">
                <h1>Bloglist App</h1>
            </header>
            <h2>Blogs</h2>
            <div>
                <h3>{props.user.name} is logged in</h3>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <AddBlogForm />
            {props.blogs
                .sort((a, b) => Number(b.likes) - Number(a.likes))
                .map(blog => <Blog key={blog.id}
                    blog={blog}
                    username={blog.user.username}
                    loggedUser={props.user.username}/>)}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        notificationMessage: state.notification.message,
        notificationType: state.notification.notifType,
        blogs: state.blogs,
        user: state.user
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    showError,
    hideNotification,
    isLoggedIn,
    login,
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
