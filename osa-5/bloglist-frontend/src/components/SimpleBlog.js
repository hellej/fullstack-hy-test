import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='bloginfo'>
      {blog.title} {blog.author}
    </div>
    <div className='bloglikes'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog