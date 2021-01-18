const router = require('express').Router();
const Product = require('../db/models/product');
const Order = require('../db/models/order');
const User = require('../db/models/user');

// GET /products
router.get('/', async (req, res, next) => {
  try {
    const productList = await Product.findAll();
    res.json(productList);
  } catch (error) {
    next(error);
  }
});

// GET /products/:id
router.get('/:productId', async (req, res, next) => {
  try {
    const id = parseInt(req.params.productId);
    if (isNaN(id)) {
      res.status(400).end();
      return;
    }
    const thisProduct = await Product.findByPk(id);
    if (!thisProduct) res.sendStatus(404);
    res.status(200).json(thisProduct);
  } catch (error) {
    next(error);
  }
});

// add to cart --- associate product to order/cart?
router.post('/:productId', async (req, res, next) => {
  try {
    const id = parseInt(req.params.productId);
    if (isNaN(id)) {
      res.status(400).end();
      return;
    }
    // req.body.variable is what the handleclick takes?
    // does req.body include quantity?
    if (req.body.addToCart) {
      const productToAdd = await Product.findByPk(id);
      // need to know user's userId or orderId...ultimately want orderId to get order instance with findByPk
      // associate productId with orderId...can call addProduct on order instance
      res.end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
