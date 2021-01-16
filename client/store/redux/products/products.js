import axios from 'axios';

//action type
const SET_PRODUCTS = 'SET_PRODUCTS';

//action creator
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

//thunk creator
export const fetchProducts = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/products');
    dispatch(setProducts(data));
  } catch (error) {
    console.log('Whoops!', error);
  }
};

//initial state
const initialState = [];

//reducer
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
