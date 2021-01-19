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
    // console.log('thisOrder: ', thisOrder);
    // console.log(req.body);
    // if (thisOrder.products && thisOrder.products.length) {
    //   console.log('we have products');
    //   for (let i = 0; i < thisOrder.products.length; i++) {
    //     if (thisOrder.products[i].id === req.body.id) {
    //       console.log('here');
    //       thisOrder.products[i].individual_product_order_details.quantity++;
    //     }
    //   }
    // }
    thisOrder.addProduct(req.body.id);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
