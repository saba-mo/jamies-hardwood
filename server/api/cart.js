const router = require('express').Router();
const Sequelize = require('sequelize');
const Product = require('../db/models/product');
const Cart = require('../db/models/cart');
// const Order = require('../db/models/order');

router.get('/', async (req, res, next) => {
  try {
    const allCarts = await Cart.findAll({
      // attributes: ['quantity', 'totalPriceForThisProduct', 'orderId'],
    });
    res.send(allCarts);
  } catch (error) {
    next(error);
  }
});

router.get('/:cartId', async (req, res, next) => {
  try {
    // look up eager loading for many to many relationship
    // look into model class and instance methods?

    const thisCart = await Cart.findAll({
      where: {
        // should be able to chagne to findByPk because Hillary added PK to cart table
        orderId: req.params.cartId
      }
      //   include: {
      //     model: Product,
      //     // required: true,
      //     // where: {
      //     //   id: Sequelize.col('cart.productId'),
      //     // },
      //     through: {
      //       where: {
      //         id: Sequelize.col('cart.productId'),
      //       },
      //     },
      //   },
      //   include Product model where productId: id or id: productId? want to load product info
    });
    if (!thisCart) res.sendStatus(404);
    res.send(thisCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
