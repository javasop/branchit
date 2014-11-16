/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  if (req.method == 'GET') req.session.returnTo = req.originalUrl
  res.redirect('/login')
}

/*
 *  User authorization routing middleware
 */

exports.user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/users/' + req.profile.id)
    }
    next()
  }
}

/*
 *  Feedback authorization routing middleware
 */

exports.post = {
  hasAuthorization: function (req, res, next) {
    if (req.post.user.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/posts/' + req.post.id)
    }
    next()
  }
}

/**
 * Feedback authorization routing middleware
 */

exports.feedback = {
  hasAuthorization: function (req, res, next) {
    // if the current user is feedback owner or post owner
    // give them authority to delete
    if (req.user.id === req.feedback.user.id || req.user.id === req.post.user.id) {
      next()
    } else {
      req.flash('info', 'You are not authorized')
      res.redirect('/posts/' + req.post.id)
    }
  }
}
