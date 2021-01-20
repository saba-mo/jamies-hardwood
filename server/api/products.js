const router = require('express').Router();
const Product = require('../db/models/product');

// DELETE /products/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    const id = parseInt(req.params.productId);
    if (isNaN(id)) {
      res.status(404).end();
      return;
    }
    const thisProduct = await Product.findOne({
      where: {id: id},
    });

    if (!thisProduct) return res.sendStatus(404).end();
    await thisProduct.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

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

module.exports = router;
