const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Cart = require('./cart');

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
