import axios from 'axios';

const GET_CART = 'GET_CART';

export const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/cart/${id}`);
      dispatch(getCart(data));
    } catch (err) {
      console.log('cart thunk error: ', err);
    }
  };
};

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
