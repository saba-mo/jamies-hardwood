//action type
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const SET_PRODUCTS = 'SET_PRODUCTS';

//action creator
const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});
export const destroyProduct = (product) => ({
  type: DELETE_PRODUCT,
  product: product,
});
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products: products,
});

//thunk creator
export const createProduct = (name, description) => {
  return async (dispatch, getState, {axios}) => {
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
export const deleteProduct = (product) => {
  return async (dispatch, getState, {axios}) => {
    try {
      await axios.delete(`/api/products/${product.id}`);
      dispatch(destroyProduct(product));
    } catch (error) {
      console.error('could not delete product: ', error);
    }
  };
};
export const fetchProducts = () => async (dispatch, getState, {axios}) => {
  try {
    const {data} = await axios.get('/api/products');
    dispatch(setProducts(data));
  } catch (error) {
    console.log('Whoops! Unable to fetch all products:', error);
  }
};

//initial state
const initialState = [];

//reducer
export default function productsReducer(products = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...products, action.product];
    case DELETE_PRODUCT:
      state = state.filter(
        (aproduct) => parseInt(aproduct.id) !== parseInt(action.aproduct.id)
      );
      return products;
    case SET_PRODUCTS:
      return action.products;
    default:
      return products;
  }
}
