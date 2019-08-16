import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import loginService from '../services/login';
import { showError, hideNotification } from '../reducers/NotificationReducer'
import { login } from '../reducers/UserReducer'

const LoginForm = (props) => {
    // TODO Transfer the state to Redux
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username, password
            });

            props.login(user)
            setUsername('');
            setPassword('');
            props.history.push('/blogs')
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

    return (
        <>
            <h2>Log in to application</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                        value={username} onChange={handleUsernameChange}
                        placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        value={password} onChange={handlePasswordChange}
                        placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </>
    );
};

const mapDispatchToProps = {
    showError,
    hideNotification,
    login
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));