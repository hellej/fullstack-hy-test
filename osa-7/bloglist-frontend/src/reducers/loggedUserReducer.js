import blogService from './../services/blogs'
import loginService from './../services/login'
import { showNotification } from './notificationReducer'


const initiaLoggedlUser = { name: null, username: null, token: null }


const loggedUserReducer = (store = initiaLoggedlUser, action) => {

  switch (action.type) {
    case 'LOGOUT':
      return { ...initiaLoggedlUser }
    case 'LOGIN':
      return action.user
    default:
      return store
  }
}


export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({ type: 'LOGOUT' })
    dispatch(showNotification({ text: 'Succesfully logged out', type: 'info' }, 3))
  }
}

export const login = (loginFields) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginFields)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(showNotification({ text: `${user.username} succesfully logged in`, type: 'info' }, 3))
      dispatch({
        type: 'LOGIN',
        user
      })
    } catch (exception) {
      dispatch(showNotification({ text: 'Incorrect username of password', type: 'error' }, 3))
    }
  }
}

export const setLoggedUser = () => {
  return async (dispatch) => {

    const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    if (!user) { return }

    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      user
    })
  }
}


export default loggedUserReducer