import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
} from 'react-router-dom'
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogList from './components/BlogList'
import UsersList from './components/UsersList'
import User from './components/User'
import { showError, hideNotification } from './reducers/NotificationReducer'
import { initializeBlogs } from './reducers/BlogReducer'
import { isLoggedIn, login, logout, getAllUsers } from './reducers/UserReducer'

function App(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const padding = { padding: 5 }

    useEffect(() => {
        props.initializeBlogs()
        props.isLoggedIn()
    }, [])

    useEffect(() => {
        props.getAllUsers()
    }, [props.blogs])

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

    const userById = (id) => {
        return props.users.find(user => user.id === id)
    }

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
            <div>
                <h3>{props.user.name} is logged in <button onClick={handleLogout}>Logout</button></h3>
            </div>
            <Router>
                <div>
                    <div>
                        <Link style={padding} to='/'>blogs</Link>
                        <Link style={padding} to='/users'>users</Link>
                    </div>
                    <Route exact path='/' render={() => <BlogList />} />
                    <Route exact path='/users' render={() => <UsersList />} />
                    <Route exact path='/users/:id' render={({ match }) =>
                        <User user={userById(match.params.id)} />
                    } />
                </div>
            </Router>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        notificationMessage: state.notification.message,
        notificationType: state.notification.notifType,
        blogs: state.blogs,
        user: state.users.user,
        users: state.users.allUsers
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    showError,
    hideNotification,
    isLoggedIn,
    login,
    logout,
    getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
