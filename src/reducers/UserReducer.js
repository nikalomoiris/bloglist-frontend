import blogService from '../services/blogs'

export const isLoggedIn = () => {
    return {
        type: 'IS_LOGGED_IN'
    }
}

export const login = (user) => {
    return {
        type: 'LOGIN',
        data: user
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

const userReducer = (state = '', action) => {
    switch (action.type) {
        case 'IS_LOGGED_IN':
            const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON);
                return user
            }
            return ''
        case 'LOGIN':
            const user = action.data
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            );

            blogService.setToken(user.token);
            return user
        case 'LOGOUT':
            window.localStorage.clear();
            return ''
        default:
            return state
    }
}

export default userReducer