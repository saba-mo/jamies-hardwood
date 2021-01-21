const User = require('./db/models/user');
const Order = require('./db/models/order');

//checking if the user is an admin
const isAdmin = async (req, res, next) =>
  req.user.isAdmin ? next() : res.send("You don't have permission");

//checking if the user identity is the identity associated with this order
const isIdentity = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
    include: {
      model: Order,
    },
  });

  user.order.id == req.params.cartId
    ? next()
    : res.send("You don't have permission");
};

module.exports = {isAdmin, isIdentity};
