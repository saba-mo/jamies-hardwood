import React from 'react'

// user type is customer or admin

class User extends React.Component {
  render() {
    const user = this.props.user
    return (
      <div className="user-individual">
        <p>
          User name: {user.firstname} {user.lastname}.
        </p>
        <p>User email: {user.email}</p>
        <p>User type: {user.type}</p>
      </div>
    )
  }
}

export default User
