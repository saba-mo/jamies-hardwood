import React from 'react';
import {connect} from 'react-redux';
import {fetchSingleProduct} from '../../store/singleProduct';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart = () => {
    console.log('add to cart clicked');
  };

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId);
  }

  render() {
    let product;
    if (this.props.product && this.props.product.id) {
      product = this.props.product;
    } else {
      // const {product} = this.props
      return (
        <div>
          <h1>{product.name}</h1>
          Description: {product.description}
          <br />
          Price: ${product.price}
          <br />
          <img src={product.imageUrl} />
          <br />
          <button type="submit" onClick={() => this.handleAddToCart()}>
            Add to Cart
          </button>
        </div>
      );
    }
  }
}

const mapState = state => {
  return {
    product: state.singleProduct
  };
};

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id))
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
