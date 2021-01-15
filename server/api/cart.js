const router = require('express').Router();
// const Product = require('../db/models/product')
const Cart = require('../db/models/cart');
// const Order = require('../db/models/order');

router.get('/', async (req, res, next) => {
  try {
    const allCarts = await Cart.findAll({
      attributes: ['quantity', 'totalPriceForThisProduct', 'orderId']
    });
    res.send(allCarts);
  } catch (error) {
    next(error);
  }
});

router.get('/:cartId', async (req, res, next) => {
  try {
    // const thisCart = await Cart.findByPk(req.params.cartId);
    const thisCart = await Cart.findAll({
      where: {
        orderId: req.params.cartId
      },
      attributes: ['quantity', 'totalPriceForThisProduct', 'orderId']
    });
    if (!thisCart) res.sendStatus(404);
    res.send(thisCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
