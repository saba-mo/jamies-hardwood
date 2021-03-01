import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  fetchCart,
  removeFromCartThunk,
  emptyCartThunk,
  addToCartThunk,
} from '../../store/redux/cart/cart';

class Cart extends React.Component {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.loadCart(this.props.match.params.cartId);
  }

  decreaseQuantity(product) {
    product.individual_product_order_details.quantity =
      Number(product.individual_product_order_details.quantity) - 1;
    this.handleChange(product);
  }

  increaseQuantity(product) {
    product.individual_product_order_details.quantity =
      Number(product.individual_product_order_details.quantity) + 1;
    this.handleChange(product);
  }

  handleChange(product) {
    product.editButtonClicked = true;
    this.props.addToCart(this.props.match.params.cartId, product);
    this.props.loadCart(this.props.match.params.cartId);
  }

  async handleRemove(orderId, id) {
    await this.props.removeFromCart(orderId, id);
    this.props.loadCart(this.props.match.params.cartId);
  }

  handleCheckout() {
    this.props.emptyCart(this.props.match.params.cartId);
    window.location.href = '/confirmation';
  }

  render() {
    const {cart} = this.props;

    let totalsArray = [0];

    return (
      <div>
        <h4 id="cart-welcome">Welcome, {this.props.email}</h4>
        <h1>Shopping Cart</h1>
        {cart && cart.length ? (
          <div>
            {cart.map((product) => {
              return (
                <div key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <h3>{product.name}</h3>
                    <img src={product.imageUrl} />
                  </Link>
                  <br />
                  Quantity:
                  <br />
                  <button
                    type="submit"
                    onClick={() => this.decreaseQuantity(product)}
                  >
                    -
                  </button>
                  {product.individual_product_order_details.quantity}
                  <button
                    type="submit"
                    onClick={() => this.increaseQuantity(product)}
                  >
                    +
                  </button>
                  <br />
                  <button
                    type="submit"
                    onClick={() =>
                      this.handleRemove(
                        this.props.match.params.cartId,
                        product.id
                      )
                    }
                  >
                    Remove
                  </button>
                  <br />
                  Item Price: ${product.price / 100}
                  <br />
                  Total Price: $
                  {(
                    (product.price *
                      product.individual_product_order_details.quantity) /
                    100
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
            <h2>
              Total Items:{' '}
              {cart.reduce(
                (accumulator, currentValue) =>
                  accumulator +
                  currentValue.individual_product_order_details.quantity,
                0
              )}
            </h2>
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
    email: state.user.email,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCart: (id) => dispatch(fetchCart(id)),
    removeFromCart: (orderId, id) => dispatch(removeFromCartThunk(orderId, id)),
    emptyCart: (orderId) => dispatch(emptyCartThunk(orderId)),
    addToCart: (orderId, item) => dispatch(addToCartThunk(orderId, item)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
