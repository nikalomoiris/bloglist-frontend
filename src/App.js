import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route, NavLink, Redirect
} from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'


import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogList from './components/BlogList'
import UsersList from './components/UsersList'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { showInfo, showError, hideNotification } from './reducers/NotificationReducer'
import { initializeBlogs } from './reducers/BlogReducer'
import { isLoggedIn, login, logout, getAllUsers } from './reducers/UserReducer'

function App(props) {
    const padding = {padding: 5}

    useEffect(() => {
        props.showInfo(`Welcome to the bloglist app`)
            setTimeout(() => {
                props.hideNotification()
            }, 5000);
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
                    <Navbar bg="light"
                        expand="lg"
                        sticky='top'>
                        <Navbar.Brand to="/blogs">Bloglist App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Navbar.Text>
                                    <NavLink style={padding} to='/blogs'>blogs</NavLink>
                                </Navbar.Text>
                                <Navbar.Text>
                                    <NavLink style={padding} to='/users'>users</NavLink>
                                </Navbar.Text>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            {props.user
                                ?<Navbar.Text>
                                    {props.user.name}
                                    <Button style={padding} variant="danger"
                                        size='sm'
                                        onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </Navbar.Text>
                                : <Navbar.Text>
                                    <NavLink style={padding} to='/login'>login</NavLink>
                                    <Redirect to="/login" />
                                </Navbar.Text>
                            }
                        </Navbar.Collapse>
                    </Navbar>
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
    showInfo,
    hideNotification,
    isLoggedIn,
    login,
    logout,
    getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
