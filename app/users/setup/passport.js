
/*!
 * Module dependencies.
 */

var eyeo = require('eyeo');
var LocalStrategy = require('passport-local').Strategy;
var User = eyeo.user;;

var local = require('./strategies/local');
//var google = require('./passport/google');
//var facebook = require('./passport/facebook');
//var twitter = require('./passport/twitter');
//var linkedin = require('./passport/linkedin');
//var github = require('./passport/github');

/**
 * Expose
 */

module.exports = function (passport) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.load({ criteria: { _id: id } }, function (err, user) {
      done(err, user)
    })
  })
 
  // use these strategies
  passport.use(local);
  /*
  passport.use(google);
  passport.use(facebook);
  passport.use(twitter);
  passport.use(linkedin);
  passport.use(github);
  */
};
