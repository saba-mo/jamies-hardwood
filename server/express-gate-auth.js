const isAdmin = async (req, res, next) =>
  req.user.isAdmin ? next() : res.send("You don't have permission");

//req.user comes from passport. Contains an object of information about a logged in user, which allows us to access "isAdmin" etc.

//checking if the user identity is the identity associated with this order
const isIdentity = async (req, res, next) => {
  console.log('req.user', req.user);

  //req.user doesn't include Order. How do we include order?
  req.user.order.id === req.params.cartId
    ? next()
    : res.send("You don't have permission");
};

module.exports = {isAdmin, isIdentity};
