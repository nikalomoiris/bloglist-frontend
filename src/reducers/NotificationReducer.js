export const showError = (message) => {
    return {
        type: 'SHOW_ERROR',
        data: {
            message,
            notifType: 'error'
        }
    }
}

export const showInfo = (message) => {
    return {
        type: 'SHOW_INFO',
        data: {
            message,
            notifType: 'info'
        }
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE',
        data: {
            message: 'none',
            notifType: 'none'
        }
    }
}

const notificationReducer = (state = {notifType: '', message: 'welcome'}, action) => {
    switch (action.type) {
        case 'SHOW_ERROR':
            return action.data
        case 'SHOW_INFO':
            return action.data
        case 'HIDE':
            return action.data
        default:
            return state
    }
}

export default notificationReducer