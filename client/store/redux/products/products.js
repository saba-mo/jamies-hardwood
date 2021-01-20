import axios from 'axios';

//action type
const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';

//action creator
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
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

export const createProduct = (name, description) => {
  return async (dispatch) => {
    try {
      const {data: newProduct} = await axios.post('/api/products', {
        name,
        description,
      });
      dispatch(addProduct(newProduct));
    } catch (error) {
      console.log('Gosh dang!', error);
    }
  };
};

//initial state
const initialState = [];

//reducer
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
