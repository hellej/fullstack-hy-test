
import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ handleClick, type, text }) => (
  <button onClick={handleClick} type={type}>
    {text}
  </button>
)


Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  type: PropTypes.string
}

export default Button