import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCart, removeFromCartThunk} from '../../store/redux/cart/cart';

class Cart extends React.Component {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.props.loadCart(this.props.match.params.cartId);
  }

  decreaseQuantity(quantity) {
    // decrement quantity in cart in db by 1
    console.log('decrease button clicked');
    quantity -= 1;
    return quantity;
  }

  increaseQuantity(quantity) {
    // increment quantity in cart in db by 1
    console.log('increase button clicked');
    quantity += 1;
    return quantity;
  }

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
    console.log('cart: ', cart);
    let totalsArray = [0];

    return (
      <div>
        <h1>Shopping Cart</h1>
        {cart && cart.length ? (
          <div>
            {cart.map((product) => {
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
                  <button
                    type="submit"
                    onClick={() =>
                      this.decreaseQuantity(
                        product.individual_product_order_details.quantity
                      )
                    }
                  >
                    -
                  </button>
                  {product.individual_product_order_details.quantity}
                  <button
                    type="submit"
                    onClick={() =>
                      this.increaseQuantity(
                        product.individual_product_order_details.quantity
                      )
                    }
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCart: (id) => dispatch(fetchCart(id)),
    removeFromCart: (orderId, id) => dispatch(removeFromCartThunk(orderId, id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
