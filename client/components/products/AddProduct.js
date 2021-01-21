import React from 'react';
import {connect} from 'react-redux';
import {createProduct} from '../../store/redux/products/products';

const defaultState = {
  name: '',
  description: '',
};

class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //name, description, quantity, price, image
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    try {
      // const price = parseInt(this.state.price) / 100;
      this.props.addProduct(this.state.name, this.state.description);
      this.setState(defaultState);
    } catch (error) {
      console.log('I failed to handle submission!', error);
    }
  }

  render() {
    const {name, description} = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">
              <small>Product Name</small>
            </label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">
              <small>Description</small>
            </label>
            <input
              name="description"
              type="text"
              value={description}
              onChange={this.handleChange}
            />
          </div>
          {/* <div>
            <label htmlFor="price">
              <small>Price</small>
            </label>
            <input
              name="price"
              type="number"
              placeholder="0.00"
              min="0"
              value="0"
              step="0.01"
              pattern="^\d+(?:\.\d{1,2})?$"
              value={price}
              onChange={this.handleChange}
            />
          </div> */}
          <div>
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addProduct: (name, description) => dispatch(createProduct(name, description)),
});

export default connect(null, mapDispatch)(AddProduct);
