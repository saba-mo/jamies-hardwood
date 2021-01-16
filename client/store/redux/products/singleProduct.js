import axios from 'axios';

//action type
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

//action creator
export const getSingleProduct = singleProduct => {
  return {
    type: GET_SINGLE_PRODUCT,
    singleProduct
  };
};

//thunk creator
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`);
      dispatch(getSingleProduct(data));
    } catch (err) {
      console.log('single product thunk error: ', err);
    }
  };
};

const initialState = {};

//reducer
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.singleProduct;
    default:
      return state;
  }
}
