const Sequelize = require('sequelize');
const db = require('../db');

/* string name changed from 'cart' to 'individual_product_order_details' for better clarity of how we set up the schemas. This schemas shows and full order details of only ONE product that is part of a larger order
i.e. many Carts are in one Order */

module.exports = db.define('individual_product_order_details', {
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
    defaultValue: 1,
  },
  // product quantity * unit price =
  totalPriceForThisProduct: {
    type: Sequelize.DECIMAL(10, 2),
  },
});
