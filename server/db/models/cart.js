const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    // look into whether this the place to add max: item inventory
    validate: {
      min: 0
    }
  },
  //   product quantity * unit price
  totalPriceForThisProduct: {
    type: Sequelize.DECIMAL
  }
})
