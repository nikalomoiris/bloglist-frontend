import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/NotificationReducer'
import blogReducer from './reducers/BlogReducer'
import userReducer from './reducers/UserReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer
})

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store