import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
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
            <form onSubmit={handleLogin}>
                <div>
                    username: <input value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    password: <input value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </>
    );
};

const mapDispatchToProps = {
    showError,
    hideNotification,
    login
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));