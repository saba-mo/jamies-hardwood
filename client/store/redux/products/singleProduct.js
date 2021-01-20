import axios from 'axios';

//action types
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

//action creators
export const destroyProduct = (product) => ({
  type: DELETE_PRODUCT,
  product: product,
});
export const getSingleProduct = (singleProduct) => {
  return {
    type: GET_SINGLE_PRODUCT,
    singleProduct,
  };
};

//thunk creators
export const deleteProduct = (product) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/${product.id}`);
      dispatch(destroyProduct(product));
    } catch (error) {
      console.error('could not delete product: ', error);
    }
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/products/${id}`);
      dispatch(getSingleProduct(data));
    } catch (err) {
      console.log('single product thunk error: ', err);
    }
  };
};

const initialState = [];

//reducer
export default function singleProductReducer(product = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.singleProduct;
    case DELETE_PRODUCT:
      product = product.filter(
        (product) => parseInt(product.id) !== parseInt(action.product.id)
      );
      return product;
    default:
      return product;
  }
}
