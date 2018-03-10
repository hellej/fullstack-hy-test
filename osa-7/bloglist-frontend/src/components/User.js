
import React from 'react'


const User = ({ history, user }) => {

  if (user) {
    window.localStorage.setItem('userToShow', JSON.stringify(user))
  }
  const userFromLS = JSON.parse(window.localStorage.getItem('userToShow'))

  return (
    <div>
      <h2>{userFromLS.name} - {userFromLS.username}</h2>
      <h3>Blogs</h3>
      <ul>
        {userFromLS.blogs.map(blog => <li key={blog._id}> {blog.title}</li>)}
      </ul>
    </div>
  )
}


export default User