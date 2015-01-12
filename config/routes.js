/*!
 * Module dependencies.
 */

// Note: We can require users, tutorials and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

var users = require('users');
var tutorials = require('tutorials');
var tags = require('tags');
var auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */

var tutorialAuth = [auth.requiresLogin, auth.tutorial.hasAuthorization];

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

  // Tutorials routes
  app.param('id', tutorials.load);
  app.get('/tutorials', tutorials.index);
  app.get('/tutorials/new', auth.requiresLogin, tutorials.new);
  app.post('/tutorials', auth.requiresLogin, tutorials.create);
  app.get('/tutorials/:id', tutorials.show);
  app.get('/tutorials/:id/edit', tutorialAuth, tutorials.edit);
  app.put('/tutorials/:id', tutorialAuth, tutorials.update);
  app.delete('/tutorials/:id', tutorialAuth, tutorials.destroy);

  // home route
  app.get('/', function(req,res){
	//list of routes
	routes = app._router.stack;
	var myroutes =[{}];

	routes.forEach(function(el){
	if(el.route){
	r = {};
	r.url =  el.route.path
	r.method = el.route.methods;
	console.log(r.url,r.method);
	}
	})
	res.send("Welcome to Branchit, the new frontier of modern education ");
        	
  });

  /** feedback routes
  app.param('feedbackId', feedbacks.load);
  app.tutorial('/tutorials/:id/feedbacks', auth.requiresLogin, feedbacks.create);
  app.get('/tutorials/:id/feedbacks', auth.requiresLogin, feedbacks.create);
  app.delete('/tutorials/:id/feedbacks/:feedbackId', feedbackAuth, feedbacks.destroy);
  **/
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
