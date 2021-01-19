import React from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../../store/redux/cart/cart';

class Cart extends React.Component {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
    // this.decreaseQuantity = this.decreaseQuantity.bind(this);
    // this.increaseQuantity = this.increaseQuantity.bind(this);
  }

  componentDidMount() {
    this.props.loadCart(this.props.match.params.cartId);
  }

  // decreaseQuantity() {
  //   // decrement quantity in cart in db by 1
  // }

  // increaseQuantity() {
  //   // increment quantity in cart in db by 1
  // }

  handleCheckout() {
    // update quantity (inventory) in db
    // empty cart
    console.log('button works');
    window.location.href = '/confirmation';
  }

  render() {
    const {cart} = this.props;

    let orderTotal;
    let totalItems;

    if (cart.products && cart.products.length) {
      // incorrect product price input, so orderTotal is wrong
      orderTotal = cart.products.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue.price),
        0
      );

      totalItems = cart.products.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.individual_product_order_details.quantity,
        0
      );
    }

    return (
      <div>
        <h1>Shopping Cart</h1>
        {cart.products && cart.products.length ? (
          <div>
            {cart.products.map((product) => {
              return (
                <div key={product.id}>
                  <h3>{product.name}</h3>
                  <br />
                  <img src={product.imageUrl} />
                  <br />
                  Quantity:
                  <br />
                  <button type="submit" onClick={this.decreaseQuantity}>
                    -
                  </button>
                  {product.individual_product_order_details.quantity}
                  <button type="submit" onClick={this.increaseQuantity}>
                    +
                  </button>
                  <br />
                  Item Price: ${product.price}
                  <br />
                  {/* Not pulling total price from db because no calculation set up */}
                  Total Price: $
                  {(Number(product.price) *
                    product.individual_product_order_details.quantity) /
                    100}
                </div>
              );
            })}
            <h2>Total Items: {totalItems}</h2>
            <h2>Order Total: ${orderTotal / 100}</h2>
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

const mapState = (state) => {
  return {
    cart: state.cartReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCart: (id) => dispatch(fetchCart(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
