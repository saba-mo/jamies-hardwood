import React from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../store/cart';

class Cart extends React.Component {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
  }

  async componentDidMount() {
    // this.props.loadCart();

    await this.props.loadCart(this.props.match.params.cartId);
  }

  //   add async when have api route figured out
  handleCheckout() {
    // update quantity (inventory) in db
    // empty cart
    // redirect to confirmation page
    // await axios.put(`/api/projects/${this.props.project.id}`, { unassignId });
    console.log('button works');
    window.location.href = '/confirmation';
    // check

    // return <Redirect to="/confirmation" />;
  }

  render() {
    console.log('cart props: ', this.props);
    const {cart} = this.props.cart || [];

    const orderTotal = cart
      .map(product => Number(product.totalPriceForThisProduct))
      .reduce(function(a, b) {
        return a + b;
      });

    const totalItems = cart
      .map(product => product.quantity)
      .reduce(function(a, b) {
        return a + b;
      });

    return (
      <div>
        <h1>Shopping Cart</h1>
        {/* {carts model quantity sum} items */}
        Total Items: {totalItems}
        {/* If cart is empty, show 'Cart is emtpy' message, otherwise, show what's below */}
        Order Total: {orderTotal}
        {/* ${orders model total Price} */}
        <br />
        {/* map over items in cart and show name, image, quantity (with ability to add/subtract), item price and total price */}
        <br />
        <button type="submit" onClick={this.handleCheckout}>
          Proceed to Checkout
        </button>
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
