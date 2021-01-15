import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProducts} from '../../store/products';

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <div>
        {this.props.products.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
              <h2>{product.name}</h2>
              <h4>${product.price}</h4>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.productsReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
