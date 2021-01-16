const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  //   product quantity * unit price
  totalPriceForThisProduct: {
    type: Sequelize.DECIMAL(10, 2),
  },
});
