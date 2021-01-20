import React from 'react';
import {connect} from 'react-redux';
import {createProduct} from '../../store/redux/products/products';

const AddProduct = (props) => {
  const {handleSubmit} = props;

  //name, description, quantity, price, image

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            <small>Product Name</small>
          </label>
          <input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="description">
            <small>Description</small>
          </label>
          <input name="description" type="text" />
        </div>
        <div>
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const name = evt.target.name.value;
      const description = evt.target.description.value;
      dispatch(createProduct(name, description));
    },
  };
};

export default connect(null, mapDispatch)(AddProduct);

/**
 * PROP TYPES
 */
// AddProduct.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
// error: PropTypes.object,
// };
