const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Cart = require('./cart');

// user swapped for order
Product.belongsToMany(User, {through: Cart, foreignKey: 'product_id'});
User.belongsToMany(Product, {through: Cart});

User.hasOne(Order);
Order.belongsTo(User);

module.exports = {
  User,
  Product,
  Order,
  Cart,
};
