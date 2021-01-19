import React from 'react';
import {connect} from 'react-redux';
import {fetchUser} from '../../store/redux/users/usersView';

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.loadUser(this.props.match.params.userId);
  }

  render() {
    const userItem = this.props.userView;
    if (!userItem.length) {
      return 'No one to see here';
    }
    const user = userItem.find(
      (useritem) => useritem.id == this.props.match.params.userId
    );
    if (!user) {
      return 'No one to see here';
    }

    return (
      <div id="single-view">
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
        <p>Is Admin: {`${user.isAdmin}`}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {userView: state.usersView};
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: (userId) => dispatch(fetchUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
