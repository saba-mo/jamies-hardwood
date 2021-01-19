import React from 'react';
import {connect} from 'react-redux';
import {fetchUsers, deleteUser} from '../../store/redux/users/usersView';
import {Link} from 'react-router-dom';

export class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.loadUsers();
  }

  handleDelete = (userToDelete) => {
    this.props.deleteUser(userToDelete);
  };

  render() {
    const userList = this.props.usersView;
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
              {userList.map((user) => {
                return (
                  <div key={`user-${user.id}`}>
                    <Link to={`/users/${user.id}`}>
                      <h4>
                        {user.firstName} {user.lastName} <p />
                        {user.email}
                      </h4>
                    </Link>
                    <button
                      type="button"
                      onClick={() => this.handleDelete(user)}
                    >
                      Delete this account
                    </button>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {usersView: state.usersView};
};

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (user) => dispatch(deleteUser(user)),
  loadUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
