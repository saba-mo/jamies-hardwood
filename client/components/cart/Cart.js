import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCart, removeFromCartThunk} from '../../store/redux/cart/cart';

class Cart extends React.Component {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
    // this.decreaseQuantity = this.decreaseQuantity.bind(this);
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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

  async handleRemove(orderId, id) {
    await this.props.removeFromCart(orderId, id);
    this.props.loadCart(this.props.match.params.cartId);
  }

  handleCheckout() {
    // update quantity (inventory) in db
    // empty cart
    window.location.href = '/confirmation';
  }

  render() {
    const {cart} = this.props;

    let totalItems;
    let totalsArray = [0];

    if (cart.products && cart.products.length) {
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
                  <Link to={`/products/${product.id}`}>
                    <h3>{product.name}</h3>
                    <br />
                    <img src={product.imageUrl} />
                  </Link>
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
                  <button
                    type="submit"
                    onClick={() => this.handleRemove(cart.id, product.id)}
                  >
                    Remove
                  </button>
                  <br />
                  Item Price: ${(product.price / 100).toFixed(2)}
                  <br />
                  Total Price: $
                  {(
                    Number(product.price / 100) *
                    product.individual_product_order_details.quantity
                  ).toFixed(1)}
                  {totalsArray.push(
                    (
                      Number(product.price / 100) *
                      product.individual_product_order_details.quantity
                    ).toFixed(2)
                  )}
                </div>
              );
            })}
            <h2>Total Items: {totalItems}</h2>
            <h2>
              Order Total: $
              {totalsArray
                .reduce(function (a, b) {
                  return Number(a) + Number(b);
                })
                .toFixed(2)}
            </h2>
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
    removeFromCart: (orderId, id) => dispatch(removeFromCartThunk(orderId, id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
