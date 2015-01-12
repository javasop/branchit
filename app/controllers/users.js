
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../../lib/utils');

/**
 * Load
 */

exports.load = function (req, res, next, id) {
  var options = {
    criteria: { _id : id }
  };
  User.load(options, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};

/**
 * Create user
 */
exports.create = function (req, res) {
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function (err) {
    if (err) {
       res.status(500);
       res.send( {
        error: utils.errors(err.errors),
        user: user
      });
    }
    res.send(200);
  });
};

//exports.signin = function (req, res) {};

/**
 * Auth callback
 */
exports.authCallback = login;
exports.signin = function(req,res){};

/**
 * Show login form
 */

exports.fail = function (req, res) {
  res.send(401).end();
};

exports.success = function (req, res) {
  res.send(200).end();
};


/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/login');
};

/**
 * Session
 */

exports.session = login;

/**
 * Login
 */

function login (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
};
