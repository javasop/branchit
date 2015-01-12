/*!
 * Module dependencies.
 */

// Note: We can require users, posts and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

var users = require('users');
var posts = require('posts');
var feedbacks = require('feedbacks');
var tags = require('tags');
var auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */

var postAuth = [auth.requiresLogin, auth.post.hasAuthorization];
var feedbackAuth = [auth.requiresLogin, auth.feedback.hasAuthorization];

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // user routes
  app.get('/fail', users.fail);
  app.get('/success',users.success);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session',
    passport.authenticate('local', {
      successRedirect:'/success',
      failureRedirect: '/fail',
      failureFlash: 'Invalid email or password.'
    }));
  app.get('/users/:userId', users.show);
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/github',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/twitter',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/google',
    passport.authenticate('google', {
      failureRedirect: '/login',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }), users.signin);
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/linkedin',
    passport.authenticate('linkedin', {
      failureRedirect: '/login',
      scope: [
        'r_emailaddress'
      ]
    }), users.signin);
  app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
      failureRedirect: '/login'
    }), users.authCallback);

  app.param('userId', users.load);

  // Post routes
  app.param('id', posts.load);
  app.get('/posts', posts.index);
  app.get('/posts/new', auth.requiresLogin, posts.new);
  app.post('/posts', auth.requiresLogin, posts.create);
  app.get('/posts/:id', posts.show);
  app.get('/posts/:id/edit', postAuth, posts.edit);
  app.put('/posts/:id', postAuth, posts.update);
  app.delete('/posts/:id', postAuth, posts.destroy);

  // home route
  app.get('/', posts.index);

  // feedback routes
  app.param('feedbackId', feedbacks.load);
  app.post('/posts/:id/feedbacks', auth.requiresLogin, feedbacks.create);
  app.get('/posts/:id/feedbacks', auth.requiresLogin, feedbacks.create);
  app.delete('/posts/:id/feedbacks/:feedbackId', feedbackAuth, feedbacks.destroy);

  // tag routes
  app.get('/tags/:tag', tags.index);


  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
}
