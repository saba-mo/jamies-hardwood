import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = ({handleClick, isLoggedIn, isAdmin, orderId}) => {
  if (isAdmin && isLoggedIn) {
    return (
      <div>
        <h1>Jamie's Hardwood and Heavy Metal</h1>
        <nav>
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Shop</Link>
            <Link to={`/cart/${orderId}`}>Cart</Link>
            <Link to="/users">Users</Link>
            {/* <Link to="/???">Add Product</Link> */}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </nav>
        <hr />
      </div>
    );
  } else if (isLoggedIn) {
    return (
      <div>
        <h1>Jamie's Hardwood and Heavy Metal</h1>
        <nav>
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Shop</Link>
            <Link to={`/cart/${orderId}`}>Cart</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </nav>
        <hr />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Jamie's Hardwood and Heavy Metal</h1>
        <nav>
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Shop</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav>
        <hr />
      </div>
    );
  }
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    orderId: state.user.order ? state.user.order.id : null,
  };
};

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
  isAdmin: PropTypes.bool.isRequired,
};
