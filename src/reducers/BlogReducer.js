import blogsService from "../services/blogs";

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = blog => {
    return async dispatch => {
        const newBlog = await blogsService.create(blog)
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

export const deleteBlog = id => {
    return async dispatch => {
        await blogsService.deleteBlog(id);
        dispatch({
            type: 'DELETE_BLOG',
            data: { id }
        })
    }
}

export const like = id => {
    return {
        type: 'ADD_LIKE',
        data: { id }
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_BLOG':
            return state.concat(action.data)
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        case 'ADD_LIKE':
            const id = action.data.id
            const oldBlog = state.find(b => b.id === id)
            const newBlog = {
                ...oldBlog,
                likes: oldBlog.likes + 1
            }
            return state.map(blog =>
                blog.id !== id ? blog : newBlog
            )
        default:
            return state
    }
}

export default blogReducer