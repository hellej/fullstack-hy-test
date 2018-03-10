import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ title, author, url, handleChange, handleSubmit, toggleParentVisibility }) => {
  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
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
        <button className='button button5' type='submit'>ADD BLOG </button>
        <button className='button button5' onClick={toggleParentVisibility()}>CANCEL </button>
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