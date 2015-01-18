var exports = module.exports;

var greeter   = require('../models/greeter');

exports.sayHello = function(req, res) {

  var name = req.param('name', '');

  var context = {
    siteTitle: "Node.js Bootstrap Demo Page"
  , welcomeMessage: greeter.welcomeMessage(name)
  };

  res.send("hello there");

};
