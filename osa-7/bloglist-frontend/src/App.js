import React from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import StyledNavLink from './components/StyledNavLink'

import './index.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { showNotification, clearNotification } from './reducers/notificationReducer'
import { login, logout, setLoggedUser } from './reducers/loggedUserReducer'
import { blogsInitialization, likeBlog, deleteBlog, createBlog } from './reducers/blogReducer'
import { usersInitialization } from './reducers/userReducer'



const LoggedInUser = ({ loggedUser, logout }) => (
  <span style={{ marginLeft: 20 }} >
    {loggedUser.name} logged in{' '}
    <span className='button buttonlogout' onClick={logout}>log out</span>
  </span>
)


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBlog: null,
      loginFields: { username: '', password: '' },
      newBlogFields: { title: '', author: '', url: '' }
    }
  }

  componentDidMount() {
    this.props.blogsInitialization()
    this.props.usersInitialization()
    this.props.setLoggedUser()
  }

  addBlog = async (event) => {
    event.preventDefault()
    const nblogs = this.props.blogs.length

    await this.props.createBlog(this.state.newBlogFields)
    if (this.props.blogs.length === nblogs + 1) {
      this.blogForm.toggleVisibility()
      this.setState({ newBlogFields: { title: '', author: '', url: '' } })
    }
  }


  handleDelete = (id) => () => {
    const blogToDelete = this.props.blogs.find(blog => blog.id === id)
    if (window.confirm(`Do you want to delete blog: "${blogToDelete.title}"`)) {
      this.props.deleteBlog(id, blogToDelete.title)
    }
  }


  handleBlogClick = (event) => {
    let selectedBlog = event.target.id
    if (selectedBlog === this.state.selectedBlog) {
      selectedBlog = ''
    }
    this.setState({ selectedBlog })
  }


  login = (e) => {
    e.preventDefault()
    this.props.login(this.state.loginFields)
  }


  handleLoginFieldChange = (event) =>
    this.setState({ loginFields: { ...this.state.loginFields, [event.target.name]: event.target.value } })

  handleNewBlogFieldChange = (event) =>
    this.setState({ newBlogFields: { ...this.state.newBlogFields, [event.target.name]: event.target.value } })


  userById = (id) =>
    this.props.users.find(a => a.id === id)

  blogById = (id) =>
    this.props.blogs.find(a => a.id === id)


  render() {
    return (
      <Router>
        <div>
          <h2>BLOGS APPLICATION</h2>
          <Notification notif={this.props.notification} />
          {this.props.loggedUser.name === null
            ?
            <Togglable buttonLabel='LOGIN'>
              <LoginForm
                username={this.state.loginFields.username}
                password={this.state.loginFields.password}
                handleChange={this.handleLoginFieldChange}
                handleSubmit={this.login} />
            </Togglable>
            :
            <div>
              <StyledNavLink text='BLOGS' to='/blogs' />
              <StyledNavLink text='USERS' to='/users' />
              <LoggedInUser loggedUser={this.props.loggedUser} logout={this.props.logout} />
              <p></p>

              <Route path='/blogs' render={() =>
                <div>
                  <Togglable buttonLabel='CREATE NEW' ref={component => this.blogForm = component}>
                    <BlogForm
                      title={this.state.newBlogFields.title}
                      author={this.state.newBlogFields.author}
                      url={this.state.newBlogFields.url}
                      handleChange={this.handleNewBlogFieldChange}
                      handleSubmit={this.addBlog}
                    />
                  </Togglable>
                  <p></p>
                  <Blogs
                    blogs={this.props.blogs}
                    handleClick={this.handleBlogClick}
                    selectedId={this.state.selectedBlog}
                    handleLikeClick={this.props.likeBlog}
                    handleDelete={this.handleDelete}
                    loggedInUser={this.props.loggedUser}
                  />
                </div>}
              />
              <Route exact path='/users' render={() => <Users />} />
              <Route exact path='/users/:id' render={({ match, history }) =>
                <User history={history} user={this.userById(match.params.id)} />}
              />
            </div>
          }
        </div>
      </Router>
    )
  }
}


const orderBlogsByLikes = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    loggedUser: state.loggedUser,
    blogs: orderBlogsByLikes(state.blogs),
    users: state.users
  }
}

const mapDispatchToProps = {
  showNotification,
  clearNotification,
  login,
  logout,
  setLoggedUser,
  blogsInitialization,
  likeBlog,
  deleteBlog,
  createBlog,
  usersInitialization
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
