import blogService from '../services/blogs'
import usersService from '../services/users'

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

export const getAllUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch ({
            type: 'GET_ALL_USERS',
            data: { allUsers: users }
        })
    }
}

const userReducer = (state = {user: '', allUsers: []}, action) => {
    switch (action.type) {
        case 'IS_LOGGED_IN':
            const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON);
                return {
                    ...state,
                    user
                }
            }
            return {
                ...state,
                user: ''
            }
        case 'LOGIN':
            const user = action.data
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            );

            blogService.setToken(user.token);
            return {
                ...state,
                user
            }
        case 'LOGOUT':
            window.localStorage.clear();
            return {
                ...state,
                user: ''
            }
        case 'GET_ALL_USERS':
            return {
                ...state,
                allUsers: action.data.allUsers
            }
        default:
            return state
    }
}

export default userReducer