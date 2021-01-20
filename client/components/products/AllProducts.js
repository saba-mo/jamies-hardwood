import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProducts} from '../../store/redux/products/products';
import {deleteProduct} from '../../store/redux/products/singleProduct';

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
            <button type="button" onClick={() => this.handleDelete(product)}>
              Delete this product
            </button>
          </div>
        ))}
      </div>
    );
  }
}

// the button above cannot be here because this is viewable by all users. We need to address this isSecureContext, to only be viewable for admin. Should we have an entirely different product view for admin?

//<button type="button" onClick={() => this.handleDelete(product)}>
//   Delete this product
// </button>

const mapState = (state) => {
  return {
    products: state.productsReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
