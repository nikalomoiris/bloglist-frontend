import React from 'react';

const LoginForm = (
    {
        handleLogin,
        username,
        handleUsernameChange,
        password,
        handlePasswordChange
    }
) => {
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

export default LoginForm;