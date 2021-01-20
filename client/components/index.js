/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Navbar} from './navbar';
export {default as UserHome} from './users/user-home';
export {Login, Signup} from './auth-form';
export {default as AllProducts} from './products/AllProducts';
export {default as SingleProduct} from './products/SingleProduct';
export {default as AllUsers} from './users/AllUsers';
export {default as SingleUser} from './users/SingleUser';
export {default as Cart} from './cart/Cart';
export {default as Confirmation} from './cart/Confirmation';
export {default as AddProduct} from './products/addProduct';
