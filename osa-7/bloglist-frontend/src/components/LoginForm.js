import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleChange, handleSubmit, toggleParentVisibility }) => {
  return (
    <div>
      <h3>LOGIN</h3>
      <form className='form' onSubmit={handleSubmit}>
        <div className='input'>
          username{' '}
          <input
            type='text'
            name='username'
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className='input'>
          password{' '}
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
          />
        </div>
        <p></p>
        <button className='button button5' type='submit'>LOGIN </button>
        <button className='button button5' onClick={toggleParentVisibility()}>CANCEL </button>

      </form>
    </div>
  )
}


LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}


export default LoginForm