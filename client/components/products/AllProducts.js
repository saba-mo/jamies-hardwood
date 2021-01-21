import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchProducts,
  deleteProduct,
} from '../../store/redux/products/products';

import Button from '@material-ui/core/Button';

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }

  handleDelete = (productToDelete) => {
    this.props.deleteProduct(productToDelete);
  };

  noProducts = (productList) => {
    if (productList.length < 1) {
      return `Thanks for checking us out! Unfortunately we're currently out of products. Please come back soon.`;
    }
  };

  render() {
    const products = this.props.products;
    const {isLoggedIn, isAdmin} = this.props;
    return (
      <div>
        {this.noProducts(products)}
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
              <h2>{product.name}</h2>
              <h4>${(product.price / 100).toFixed(2)}</h4>
            </Link>
            {isAdmin && isLoggedIn && (
              <Button
                variant="contained"
                size="small"
                onClick={() => this.handleDelete(product)}
              >
                Delete this product
              </Button>
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.productsReducer,
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);

AllProducts.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
