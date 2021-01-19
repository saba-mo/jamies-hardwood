import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import productsReducer from './redux/products/products';
import singleProduct from './redux/products/singleProduct';
import usersReducer from './redux/users/usersReducer';
import cartReducer from './redux/cart/cart';

export const reducer = combineReducers({
  user,
  singleProduct,
  usersReducer,
  productsReducer,
  cartReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({axios}),
    createLogger({collapsed: true})
  )
);

const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './redux/products/singleProduct';
export * from './redux/products/products';
