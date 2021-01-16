import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import productsReducer from './redux/products/products';
import singleProduct from './redux/products/singleProduct';
import usersReducer from './redux/users/usersReducer';

export const reducer = combineReducers({
  user,
  singleProduct,
  usersReducer,
  productsReducer
});

// this chunk was given to us in JPFP
// let middleware = [
//   // `withExtraArgument` gives us access to axios in our async action creators!
//   // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
//   thunkMiddleware.withExtraArgument({axios}),
// ]
// if (process.browser) {
//   /*We'd like the redux logger to only log messages when it's running in the browser, and not when we run the tests from within Mocha. */
//   middleware = [...middleware, createLogger({ collapsed: true })]
// }
// I think by adding `.withExtraArgument({axios})` below it doesn't change is set up in BoilerMaker and enables us to access axios in the same way

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
