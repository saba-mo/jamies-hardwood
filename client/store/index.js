import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './redux/users/userIdentity';
import productsReducer from './redux/products/products';
import singleProduct from './redux/products/singleProduct';
import usersView from './redux/users/usersView';
import cartReducer from './redux/cart/cart';

export const reducer = combineReducers({
  user,
  singleProduct,
  usersView,
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
export * from './redux/users/userIdentity';
export * from './redux/products/singleProduct';
export * from './redux/products/products';
