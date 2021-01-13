import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, deleteUser} from '../../store/redux/robots/robotsReducer'
import {Link} from 'react-router-dom'
import User from './user'

export class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.loadUsers()
  }

  handleDelete = userToDelete => {
    this.props.deleteUser(userToDelete)
  }

  render() {
    const userList = this.props.users
    return (
      <div>
        <main>
          <h1>Jamie's Hard Wood and Heavy Metal </h1>
          <h3>See all customers and admin users here.</h3>
          <p />
        </main>
        <div id="full-list-display">
          <div id="list">
            <ul>
              {userList.map(user => {
                return (
                  <div key={`user-${user.id}`}>
                    <Link to={`/users/${user.id}`}>
                      <h4>
                        {user.firstname} {user.lastname}
                      </h4>
                    </Link>
                    Click here to delete {user.firstname} {user.lastname} --->
                    <button
                      type="button"
                      onClick={() => this.handleDelete(user)}
                    >
                      Delete
                    </button>
                    <User user={user} />
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {users: state.users}
}

const mapDispatchToProps = dispatch => ({
  deleteUser: user => dispatch(deleteUser(user)),
  loadUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
