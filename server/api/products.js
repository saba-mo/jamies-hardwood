const router = require('express').Router()
const Product = require('../db/models/product')

router.get('/', async (req, res, next) => {
  try {
    const productList = await Product.findAll()
    res.send(productList)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const thisProduct = await Product.findByPk(req.params.productId)
    if (!thisProduct) res.sendStatus(404)
    res.send(thisProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
