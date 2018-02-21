import React from 'react'


const Blog = ({ blog, handleClick, handleLikeClick, handleDelete, selectedId }) => {
  let style = { display: '' }
  if (blog.user !== undefined) {
    const username = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username
    style = { display: username === blog.user.username ? '' : 'none' }
  }

  if (blog.id === selectedId) {
    return (
      <div className='selectedBlog'>
        <div onClick={handleClick} id={blog.id}>
          <div><b>{blog.title}</b> by <b>{blog.author}</b> </div>
        </div>
        <div><a href={blog.url}>Link to the blog</a></div>
        <div>Likes {blog.likes} <button onClick={handleLikeClick} id={blog.id}> like </button>
        </div>
        <div>Added by {blog.user.name} </div>
        <div><button style={style} onClick={handleDelete} id={blog.id}> delete </button></div>
      </div>
    )
  }
  return (
    <div className='blog' onClick={handleClick} id={blog.id}>
      {blog.title} by {blog.author}
    </div>
  )
}

export default Blog