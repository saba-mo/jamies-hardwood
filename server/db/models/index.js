const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Cart = require('./cart');

// user swapped for order for association testing purposes because we have a db seeded with users and products.

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
