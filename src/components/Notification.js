import React from 'react';

const Notification = ({ message, type }) => {
    const error = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    };

    const info = {
        color: 'blue',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    };

    if (message === null) {
        return null;
    }

    if (type === 'error') {
        return (
            <div style={error}>
                {message}
            </div>
        );
    } else {
        return (
            <div style={info}>
                {message}
            </div>
        );
    }
};

export default Notification;