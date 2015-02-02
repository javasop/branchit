/**
 * This is a self-contained module that defines its routes, callbacks, models and views
 * all internally. Such approach to code organization follows the recommendations of TJ:
 *
 * http://vimeo.com/56166857
 *
 */

// Third-party libraries
var express = require('express')
    , exports = module.exports = express()
    , app = exports;

var userModel = require('./models/users');
var userController = require('./controllers/users');
var acl = require("acl");

// Don't just use, but also export in case another module needs to use these as well.
exports.callbacks = require('./controllers/users');
exports.models = userModel;


// Module's Routes. Please note this is actually under /users, because module is attached under /hello
app.post('/', exports.callbacks.register);
app.post('/login', exports.callbacks.login);
app.get('/success', exports.callbacks.success);
app.get('/failure', exports.callbacks.failure);
app.post('/checkReq',acl.login, exports.callbacks.checkReq);
