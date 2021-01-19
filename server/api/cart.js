const router = require('express').Router();
const Product = require('../db/models/product');
const Order = require('../db/models/order');
const Cart = require('../db/models/cart');

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

router.post('/:cartId', async (req, res, next) => {
  try {
    // This request comes along with:
    // 1. Cart id
    // 2. Product ID
    // 3. Quantity

    // Does this order have an instance of this product?
    // Get one from Cart model where (orderId = req.params.cartId AND productId = req.body.id)
    const productExistsInCart = await Cart.findOne({
      where: {
        product_id: req.body.id,
        order_id: req.params.cartId,
      },
    });
    // If so (if one result), increment the quantity by req.body.quantity
    if (productExistsInCart) {
      // Cart.quantity++
      productExistsInCart.quantity++;
    }

    // If not (if zero results), create an instance with req.body.quantity
    else {
      // Create new Cart entry with (orderId = req.params.cartId AND productId = req.body.id) params, also quantity
      const newOrderItem = await Cart.create({
        order_id: req.params.cartId,
        product_id: req.body.id,
        // quantity: req.body.quantity,
      });
    }

    // previous way of adding to cart
    // const thisOrder = await Order.findByPk(req.params.cartId);
    // thisOrder.addProduct(req.body.id);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
