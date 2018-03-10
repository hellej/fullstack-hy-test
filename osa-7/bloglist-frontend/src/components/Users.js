import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Users = (props) => {

  return (
    <div>
      <table>
        <tbody>
          <tr><th>NAME</th><th>BLOGS</th></tr>
          {props.users.map(user =>
            <User
              key={user.id}
              user={user}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

const User = ({ user }) => {
  return (
    <tr>
      <td><Link to={`/users/${user.id}`}> {user.name}</Link></td><td>{user.blogs.length}</td>
    </tr>
  )
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}


const ConnectedUsers = connect(mapStateToProps, null)(Users)
export default ConnectedUsers