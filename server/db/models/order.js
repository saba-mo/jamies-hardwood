const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('order', {
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
  },
});
