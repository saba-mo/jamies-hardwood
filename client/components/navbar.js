import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

//approach: instead of "isLoggedIn", the ternary should be "isAdmin"
//if yes, display a navbar that incudes links to a cart that is editable (which will happen on the cart end), and an additional users tab for the admin to view all-users (and single user from there, if we need/want). Both cart and users component should also have ternary operator, and show "Access denied" or whatever, if somehow a non-admin gets there.

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Jamie's Hardwood and Heavy Metal</h1>
    <nav>
      {/* curently made this !isLoggedIn instead of isLoggedIn in order to work on viewing the loggedIn page without Oath up and running. Eventually will be reversed and/or completely removed and replaced by "isAdmin" vvvvvv*/}
      {!isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/cart">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

//isAdmin needs to be imported here, and maybe also below with proptypes?

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
