import blogService from './../services/blogs'
import { showNotification } from './notificationReducer'
import { addBlogToUser } from './userReducer'

const initialBlogs = []


const blogReducer = (store = initialBlogs, action) => {

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs

    case 'LIKE_BLOG':
      const old = store.filter(b => b.id !== action.id)
      const liked = store.find(b => b.id === action.id)
      return [...old, { ...liked, likes: liked.likes + 1 }]

    case 'DELETE_BLOG':
      return store.filter(b => b.id !== action.id)

    case 'CREATE_BLOG':
      return store.concat(action.blog)

    default:
      return store
  }
}



export const blogsInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getOne(id)
    blog.likes++
    await blogService.update(blog.id, blog)
    dispatch({
      type: 'LIKE_BLOG',
      id
    })
  }
}

export const deleteBlog = (id, title) => {
  return async (dispatch) => {

    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
    dispatch(showNotification({ text: `Blog "${title}" removed`, type: 'info' }, 3))

  }
}

export const createBlog = (blog) => {

  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    console.log('error: ', newBlog.error)
    if (newBlog.error) {
      dispatch(showNotification({ text: newBlog.error, type: 'error' }, 3))
    } else {
      dispatch({
        type: 'CREATE_BLOG',
        blog: newBlog
      })
      dispatch(addBlogToUser(newBlog))
      dispatch(showNotification({ text: `${newBlog.title} added to blogs`, type: 'info' }, 3))
    }
  }

}




export default blogReducer