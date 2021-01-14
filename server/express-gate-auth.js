// export
const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send("You don't have permission");
