const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Cart = require('./cart');

//Cart is renamed for local database to 'individual_product_order_details'
Product.belongsToMany(Order, {through: Cart, foreignKey: 'product_id'});
Order.belongsToMany(Product, {through: Cart, foreignKey: 'order_id'});

User.Order = User.hasOne(Order);
Order.User = Order.belongsTo(User);

module.exports = {
  User,
  Product,
  Order,
  Cart,
};
