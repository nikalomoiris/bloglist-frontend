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

export const like = (newBlog, id) => {
    return async dispatch => {
        const blogToSave = await blogsService.update(newBlog, id)
        dispatch({
            type: 'ADD_LIKE',
            data: {
                blogToSave,
                id
            }
        })
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
            return state.map(blog =>
                blog.id !== action.data.id ? blog : action.data.blogToSave
            )
        default:
            return state
    }
}

export default blogReducer