import axios from 'axios';

const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  item,
});

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

export const addToCartThunk = (orderId, item) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/cart/${orderId}`, item);
      dispatch(addToCart(data));
    } catch (err) {
      console.log('add to cart thunk error: ', err);
    }
  };
};

export const removeFromCartThunk = (orderId, id) => {
  return async (dispatch) => {
    try {
      await axios
        .delete(`/api/cart/${orderId}/${id}`)
        .then(dispatch(removeFromCart(id)));
    } catch (err) {
      console.log('delete from cart thunk error: ', err);
    }
  };
};

const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      // return {...state, products: [...state.products, action.item]};
      return [...state.products, action.item];
    case REMOVE_FROM_CART:
      return [...state.products.filter((item) => item.id !== action.id)];
    default:
      return state;
  }
}
