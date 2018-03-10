import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='bloginfo'>
      {blog.title} {blog.author}
    </div>
    <div className='bloglikes'>
      blog has {blog.likes} likes
      <button class='button button5' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog