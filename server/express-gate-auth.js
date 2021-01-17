const isAdmin = async (req, res, next) =>
  req.user.isAdmin ? next() : res.send("You don't have permission");

//req.user comes from passport. Contains an object of information about a logged in user, which allows us to access "isAdmin" etc.

module.exports = isAdmin;
