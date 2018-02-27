import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import Button from './components/Buttons'
import './index.css'


const Notification = ({ notif }) => {
  return (
    <div className={notif.notifType}>
      {notif.message}
    </div>
  )
}

const Blogs = ({ blogs, handleClick, handleLikeClick, handleDelete, selectedId, loggedInUser }) => {
  return (
    <div>
      <br></br>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleClick={handleClick}
          selectedId={selectedId}
          handleLikeClick={handleLikeClick}
          handleDelete={handleDelete}
          loggedInUser={loggedInUser}
        />
      )}
    </div>
  )
}


const emptyBlogFields = { title: '', author: '', url: '' }
let notifTimeout = null

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      selectedBlog: null,
      user: null,
      username: '',
      password: '',
      newBlog: emptyBlogFields,
      notif: { message: '', notifType: '' }
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs: this.orderBlogsByLikes(blogs) })
    )

    const user = this.getUserFromWLS()
    if (user) {
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  getUserFromWLS = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      return JSON.parse(loggedUserJSON)
    }
    return null
  }

  addBlog = async (event) => {
    event.preventDefault()
    console.log('trying to add...')

    let newBlog = await blogService.create(this.state.newBlog)
    console.log(newBlog)

    if (newBlog.title) {
      this.blogForm.toggleVisibility()

      delete (newBlog.user)
      newBlog.user = {
        name: JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).name,
        username: JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).username
      }
      this.showNotification({ message: `${newBlog.title} added to blogs`, notifType: 'info' })
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        newBlog: emptyBlogFields
      })
    }

    if (newBlog.error) { this.showNotification({ message: `${newBlog.error}`, notifType: 'error' }) }

  }

  handleDelete = async (event) => {
    const id = event.target.id
    const blogToDelete = this.state.blogs.find(blog => blog.id === id)
    console.log('trying to delete...')

    if (window.confirm(`Do you want to delete blog: "${blogToDelete.title}"`)) {
      let res
      try {
        res = await blogService.remove(id)
      } catch (error) {
        res = error.response.data
      }
      if (res.status === 204) {
        this.setState({
          blogs: this.state.blogs.filter(blog => blog.id !== id)
        })
        this.showNotification({ message: `Blog "${blogToDelete.title}" removed`, notifType: 'info' })
      } else {
        console.log(res)
        this.showNotification({ message: `${res.error}`, notifType: 'error' })
      }
    }
  }

  handleBlogClick = (event) => {
    let selectedBlog = event.target.id
    if (selectedBlog === this.state.selectedBlog) {
      selectedBlog = ''
    }
    this.setState({ selectedBlog })
  }

  handleLikeClick = (event) => {
    let selectedBlog = this.state.blogs.find(blog => blog.id === event.target.id)
    selectedBlog.likes = selectedBlog.likes + 1
    blogService.update(selectedBlog.id, selectedBlog)

    const blogsForUpdate = this.state.blogs.map(blog => blog.id !== selectedBlog.id ? blog : selectedBlog)
    this.setState({
      blogs: this.orderBlogsByLikes(blogsForUpdate)
    })
  }


  orderBlogsByLikes = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log(user)


      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      this.setState({ selectedBlog: '', username: '', password: '', user })
      this.showNotification({ message: `${user.username} succesfully logged in`, notifType: 'info' })

    } catch (exception) {
      this.showNotification({ message: 'Incorrect username of password', notifType: 'error' })
    }
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({ username: '', password: '', user: null })
    this.showNotification({ message: 'Succesfully logged out', notifType: 'info' })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleNewBlogFieldChange = (event) => {
    const newBlog = { ...this.state.newBlog, [event.target.name]: event.target.value }
    this.setState({ newBlog })
  }

  showNotification = (notification) => {
    this.setState({
      notif: notification
    })

    clearTimeout(notifTimeout)
    notifTimeout = setTimeout(() => {
      this.setState({
        notif: { message: '', notifType: '' }
      })
    }, 4500)
  }


  render() {

    return (
      <div>
        <h2>Blogs</h2>
        <Notification notif={this.state.notif} />
        {this.state.user === null
          ?
          <Togglable buttonLabel='login'>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login} />
          </Togglable>
          :
          <div>
            <p>
              {this.state.user.name} logged in{' '}
              <Button handleClick={this.logout} text='log out' />
            </p>
            <h3>Create new </h3>
            <Togglable buttonLabel='add new blog' ref={component => this.blogForm = component}>
              <BlogForm
                title={this.state.newBlog.title}
                author={this.state.newBlog.author}
                url={this.state.newBlog.url}
                handleChange={this.handleNewBlogFieldChange}
                handleSubmit={this.addBlog}
              />
            </Togglable>
            <Blogs
              blogs={this.state.blogs}
              handleClick={this.handleBlogClick}
              selectedId={this.state.selectedBlog}
              handleLikeClick={this.handleLikeClick}
              handleDelete={this.handleDelete}
              loggedInUser={this.getUserFromWLS()}
            />
          </div>
        }
      </div >
    )
  }
}


export default App
