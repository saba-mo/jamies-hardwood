import axios from 'axios';

//action types

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

//action creators

export const getSingleProduct = (singleProduct) => {
  return {
    type: GET_SINGLE_PRODUCT,
    singleProduct,
  };
};

//thunk creators

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

    default:
      return product;
  }
}
