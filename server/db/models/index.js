const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Cart = require('./cart');

Product.belongsToMany(Order, {through: Cart, foreignKey: 'product_id'});
Order.belongsToMany(Product, {through: Cart});

User.hasOne(Order);
Order.belongsTo(User);

module.exports = {
  User,
  Product,
  Order,
  Cart,
};
