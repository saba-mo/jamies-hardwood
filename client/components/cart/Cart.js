import React from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../../store/redux/cart/cart';

class Cart extends React.Component {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentDidMount() {
    this.props.loadCart(this.props.match.params.cartId);
  }

  handleCheckout() {
    // update quantity (inventory) in db
    // empty cart
    console.log('button works');
    window.location.href = '/confirmation';
  }

  render() {
    // Cart table on local database needs data for orderTotal and totalItems to work.
    const {cart} = this.props;

    let orderTotal = cart.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.totalPriceForThisProduct),
      0
    );

    let totalItems = cart.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );
    console.log(cart);
    return (
      <div>
        <h1>Shopping Cart</h1>
        {cart.length ? (
          <div>
            <p>Total Items: {totalItems}</p>
            <p>Order Total: {orderTotal}</p>
            {/* map over items in cart and show name, image, quantity (with ability to add/subtract), item price and total price */}
            <button type="submit" onClick={this.handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <div>No items in cart. Continue shopping!</div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    cart: state.cartReducer
  };
};

const mapDispatch = dispatch => {
  return {
    loadCart: id => dispatch(fetchCart(id))
  };
};

export default connect(mapState, mapDispatch)(Cart);
