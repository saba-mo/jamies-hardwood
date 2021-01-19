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

    if (!userList.length) {
      return 'No one to see here';
    }
    const admin = (user) => {
      if (user.isAdmin) {
        return `This person is also an Admin:`;
      } else return '';
    };

    return (
      <div>
        <main>
          <h3>
            Hello Administrator! Check out all these folks that have signed up.
          </h3>
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
                        {admin(user)} <p />
                        {user.firstName} {user.lastName}, {user.email} <p />
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
