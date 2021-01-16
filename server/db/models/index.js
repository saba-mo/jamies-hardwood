const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Cart = require('./cart');

// const individualProductOrderDetails = require('./cart');
// Product.belongsToMany(Order, {through: individualProductOrderDetails, foreignKey: 'product_id'});

Product.belongsToMany(User, {through: Cart, foreignKey: 'product_id'});
User.belongsToMany(Product, {through: Cart, foreignKey: 'order_id'});

User.hasOne(Order);
Order.belongsTo(User);

module.exports = {
  User,
  Product,
  Order,
  Cart,
};
