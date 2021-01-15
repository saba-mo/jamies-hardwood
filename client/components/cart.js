import React from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../store/cart';

class Cart extends React.Component {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
  }

  //   do we need async await?
  async componentDidMount() {
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
  }

  render() {
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
        {/* If cart is empty, show 'Cart is emtpy' message, otherwise, show what's below */}
        Total Items: {totalItems}
        <br />
        Order Total: {orderTotal}
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
