const router = require('express').Router();
const Product = require('../db/models/product');
const Order = require('../db/models/order');

router.get('/:cartId', async (req, res, next) => {
  try {
    const id = parseInt(req.params.cartId);
    if (isNaN(id)) {
      res.sendStatus(400);
    }
    const thisCart = await Order.findByPk(id, {
      include: {model: Product},
    });
    if (!thisCart) res.sendStatus(404);
    res.json(thisCart);
  } catch (error) {
    next(error);
  }
});

// add to cart is working, but not taking in quantity to be added
router.post('/:cartId', async (req, res, next) => {
  try {
    const thisOrder = await Order.findByPk(req.params.cartId);
    thisOrder.addProduct(req.body.id);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
