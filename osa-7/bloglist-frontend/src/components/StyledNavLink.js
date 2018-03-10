import React from 'react'
import { NavLink } from 'react-router-dom'


const StyledNavLink = ({ text, to }) => {

  return (
    <span>
      <NavLink
        className='navlink'
        activeClassName='act-navlink'
        exact to={to}>{text}
      </NavLink>
    </span>
  )
}

export default StyledNavLink