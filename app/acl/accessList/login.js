module.exports =  function (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) return next()
  if (req.method == 'GET') req.session.returnTo = req.originalUrl
  res.sendStatus(401)
}

