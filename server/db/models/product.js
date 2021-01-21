const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },

  description: {
    type: Sequelize.TEXT,
  },

  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },

  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true,
      notNull: true,
    },
  },

  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://i.pinimg.com/564x/55/6f/77/556f77d9f8911c21963879ea256c7443.jpg',
  },
});
