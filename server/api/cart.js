const router = require('express').Router();
const Sequelize = require('sequelize');
const Product = require('../db/models/product');
const Cart = require('../db/models/cart');
const Order = require('../db/models/order');

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
    const thisCart = await Cart.findAll({
      where: {
        order_id: req.params.cartId
      }
    });
    if (!thisCart) res.sendStatus(404);
    res.json(thisCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
