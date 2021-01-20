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

router.put('/:cartId', async (req, res, next) => {
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
      productExistsInCart.quantity += Number(req.body.quantityToAdd);
      res.json(productExistsInCart);
    }

    // If not (if zero results), create an instance with req.body.quantity
    else {
      // create association
      const newOrderItem = await Cart.create({
        order_id: req.params.cartId,
        product_id: req.body.id,
        quantity: Number(req.body.quantityToAdd),
      });

      // take last element of products array in order so that it has same fields as what GET CART sends back
      const thisCart = await Order.findByPk(req.params.cartId, {
        include: {model: Product},
      });

      res.json(thisCart.products[thisCart.products.length - 1]);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:cartId/:productId', async (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cartId);
    if (isNaN(cartId)) return res.status(404).end();

    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) return res.status(404).end();

    const thisOrder = await Order.findByPk(cartId);
    thisOrder.removeProduct(productId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
