var exports = module.exports;
var passport = require('passport');
var eyeo = require('eyeo');
var User = eyeo.user;


exports.sayHello = function(req, res) {

  var name = req.param('name', '');

  var context = {
    siteTitle: "Node.js Bootstrap Demo Page"
  , welcomeMessage: greeter.welcomeMessage(name)
  };

  res.send("hello there");

};
exports.register = function(req, res) {

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
exports.login = function(req, res) {
 passport.authenticate('local', {
      successRedirect:'/success',
      failureRedirect: '/fail',
      failureFlash: 'Invalid email or password.'
    })
};
