const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
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
    //   confirm type for prices
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0,
    },
  },

  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://scontent.fdet1-1.fna.fbcdn.net/v/t1.0-9/48355230_2197053220325955_285086455796072448_n.jpg?_nc_cat=107&ccb=2&_nc_sid=0debeb&_nc_ohc=rcAYcAw-5VcAX9ofu4G&_nc_ht=scontent.fdet1-1.fna&oh=f62b16590bd0087ebb4caeb154646940&oe=6023BD24',
  },
});
