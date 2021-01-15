import axios from 'axios';

const GET_CART = 'GET_CART';
// const EMPTY_CART = 'EMPTY_CART';

export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  };
};

// export const emptyCart = (id) => {
//   return {
//     type: EMPTY_CART,
//     id,
//   };
// };

// not sure if it needs to take id
export const fetchCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${id}`);
      dispatch(getCart(data));
    } catch (err) {
      console.log('cart thunk error: ', err);
    }
  };
};

// not sure if it needs to take id
// export const fetchEmptyCart = (id) => {
//   return async (dispatch) => {
//     try {
//       // not sure what the api route is yet
//       //   await axios.delete(`/api/cart/${id}`);
//       dispatch(emptyCart(id));
//     } catch (err) {
//       console.log('empty cart thunk error: ', err);
//     }
//   };
// };

// need to revisit initial state datatype and reducer return statements, should this be object?
const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    // case EMPTY_CART:
    //   return action.cart;
    default:
      return state;
  }
}
