import React from 'react'




const Blogs = ({ blogs, handleClick, handleLikeClick, handleDelete, selectedId, loggedInUser }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleClick={handleClick}
          selectedId={selectedId}
          handleLikeClick={() => handleLikeClick(blog.id)}
          handleDelete={handleDelete}
          loggedInUser={loggedInUser}
        />
      )}
    </div>
  )
}


const Blog = ({ blog, handleClick, handleLikeClick, handleDelete, selectedId, loggedInUser }) => {
  let style = { display: '' }
  if (blog.user !== undefined) {
    style = { display: loggedInUser.username === blog.user.username ? '' : 'none' }
  }

  if (blog.id === selectedId) {
    return (
      <div className='blogbox selectedBlog'>
        <div onClick={handleClick} id={blog.id}>
          <div className='hoverblog' >{blog.title} by {blog.author} </div>
        </div>
        <div><a href={blog.url}>Link to the blog</a></div>
        <div>Likes {blog.likes} <button onClick={handleLikeClick}> like </button>
        </div>
        <div>Added by {blog.user.name} </div>
        <div><button style={style} onClick={handleDelete(blog.id)}> delete </button></div>
      </div>
    )
  }

  return (
    <div className='blogbox blog hoverblog' onClick={handleClick} id={blog.id}>
      {blog.title} by {blog.author}
    </div>
  )
}

export default Blogs