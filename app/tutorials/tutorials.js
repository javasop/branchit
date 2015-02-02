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


	var tutM = require('./models/tutorials');
	var tutC = require('./controllers/tutorials');
	var acl = require("acl");
	// Don't just use, but also export in case another module needs to use these as well.
	exports.callbacks = tutC; 

	// Module's Routes. Please note this is actually under /tutorials, because module is attached under /hello
	/* Tutorials routes*/
	app.param('id', tutC.load);
	app.get('/', tutC.index);
	app.post('/', tutC.create);
	app.get('/:id', tutC.show);
	app.put('/:id', tutC.update);
	app.delete('/:id', tutC.destroy);
	
/**
	app.post('/',acl.login, tutC.create);
	app.put('/:id', acl.tutorial, tutC.update);
	app.delete('/:id', acl.tutorial, tutC.destroy);
	**/
