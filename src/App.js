import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route, Link, Redirect
} from 'react-router-dom'
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogList from './components/BlogList'
import UsersList from './components/UsersList'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { showError, hideNotification } from './reducers/NotificationReducer'
import { initializeBlogs } from './reducers/BlogReducer'
import { isLoggedIn, login, logout, getAllUsers } from './reducers/UserReducer'

function App(props) {
    const padding = { padding: 5 }

    useEffect(() => {
        props.initializeBlogs()
        props.isLoggedIn()
    }, [])

    useEffect(() => {
        props.getAllUsers()
    }, [props.blogs])

    const handleLogout = () => {
        props.logout()
    };

    const userById = (id) => {
        return props.users.find(user => user.id === id)
    }

    const blogById = (id) => {
        return props.blogs.find(blog => blog.id === id)
    }

    return (
        <div className="App">
            <Notification message={props.notificationMessage}
                type={props.notificationType} />
            <Router>
                <div>
                    <nav>
                        <Link style={padding} to='/blogs'>blogs</Link>
                        <Link style={padding} to='/users'>users</Link>
                        {props.user
                            ?<>
                                {props.user.name} is logged in
                                <button onClick={handleLogout}>Logout</button>
                            </>
                            : <>
                                <Link style={padding} to='/'>login</Link>
                                <Redirect to="/login" />
                            </>
                        }
                    </nav>
                    <header className="App-header">
                        <h1>Bloglist App</h1>
                    </header>
                    <Route exact path='/login' render={() => <LoginForm />} />
                    <Route exact path='/blogs' render={() => <BlogList />} />
                    <Route exact path='/users' render={() => <UsersList />} />
                    <Route exact path='/users/:id' render={({ match }) =>
                        <User user={userById(match.params.id)} />
                    } />
                    <Route exact path='/blogs/:id' render={({ match }) =>
                        blogById(match.params.id) ?
                            <BlogDetails blog={blogById(match.params.id)} />
                            : <Redirect to="/blogs" />

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
