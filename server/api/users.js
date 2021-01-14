const router = require('express').Router();
const {User} = require('../db/models');
const {isAdmin} = require('../express-gate-auth');
// const { Cart } = require('../db/models')

// DELETE /users/:userId
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(404).end();

    const user = await User.findOne({
      where: {id: id}
    });

    if (!user) return res.status(404).end();
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// GET /users
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findAll({
      // explicitly select only the id and email fields - even though users' passwords are encrypted, it is unnecessary to view more on the view all page
      // Also, it won't help if we just send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'email']
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// GET /users/:userId
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).end();
      return;
    }
    const user = await User.findOne({
      where: {
        id: id
      },
      attributes: ['id', 'firstName', 'lastName', 'email']
      // include: Cart,
    });

    if (!user) {
      res.status(404).end();
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
