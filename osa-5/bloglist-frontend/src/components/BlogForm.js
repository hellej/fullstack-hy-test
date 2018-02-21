import React from 'react'
import PropTypes from 'prop-types'
import Button from './Buttons'


const BlogForm = ({ title, author, url, handleChange, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='input'>
          title{' '}
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className='input'>
          author{' '}
          <input
            type='text'
            name='author'
            value={author}
            onChange={handleChange}
          />
        </div>
        <div className='input'>
          url{' '}
          <input
            type='text'
            name='url'
            value={url}
            onChange={handleChange}
          />
        </div>
        <Button type='submit' text='add blog' />
      </form>
    </div>
  )

}

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}


export default BlogForm