const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
  },
});

module.exports = Order;
