import React from 'react';
import {connect} from 'react-redux';
import {createProduct} from '../../store/redux/products/products';

const AddProduct = (props) => {
  const {handleSubmit, name} = props;

  //name, description, quantity, price

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="name">
            <small>Product Name</small>
          </label>
          <input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="descrition">
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

export default connect(mapState, mapDispatch)(AddProduct);
