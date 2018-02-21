import React from 'react'
import PropTypes from 'prop-types'
import Button from './Buttons'

const LoginForm = ({ username, password, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
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
        <Button type='submit' text='login' />
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