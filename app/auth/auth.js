/**
* This is a self-contained module that defines its routes, callbacks, models and views
* all internally. Such approach to code organization follows the recommendations of TJ:
*
* http://vimeo.com/56166857
* 
*/

// Third-party libraries
var express = require('express')
  , passport = require('passport')
  , exports = module.exports = express()
  , app = exports;



require('./setup/passport')(passport);


// initialize passport
app.use(passport.initialize());


// Don't just use, but also export in case another module needs to use these as well.
exports.callbacks    = require('./controllers/auth');
exports.models       = require('./models'); 

// Module's Routes. Please note this is actually under /auth, because module is attached under /hello
app.get('/', exports.callbacks.sayHello);
