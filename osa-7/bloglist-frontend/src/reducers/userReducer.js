
import userService from './../services/users'

const initialUsers = []


const usersReducer = (store = initialUsers, action) => {

  switch (action.type) {
    case 'INIT_USERS':
      return action.users
    case 'BLOG_2_USER':
      const other = store.filter(b => b.id !== action.userid)
      const adder = store.find(b => b.id === action.userid)
      return [...other, { ...adder, blogs: adder.blogs.concat(action.blog) }]
    default:
      return store
  }
}

export const usersInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}

export const addBlogToUser = (blog) => {
  return async (dispatch) => {
    console.log('blog: ', blog)
    dispatch({
      type: 'BLOG_2_USER',
      blog,
      userid: blog.user._id
    })
  }
}


export default usersReducer