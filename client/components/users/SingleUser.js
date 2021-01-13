import React from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../../redux/users/usersReducer'

// user type is customer or admin

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.loadUser(this.props.match.params.id)
  }

  render() {
    const userList = this.props.users
    if (!userList.length) {
      return 'No one to see here'
    }

    const user = userList.find(
      (useritem) => useritem.id == this.props.match.params.id
    )

    return (
      <div id="single-view">
        <p>
          User name: {user.firstName} {user.lastName}.
        </p>
        <p>User email: {user.email}</p>
        <p>User type: {user.type}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {users: state.users}
}

const mapDispatchToProps = (dispatch) => ({
  loadUser: (userId) => dispatch(fetchUser(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
