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


	var conM = require('./models/concepts');
	var conC = require('./controllers/concepts');
	var acl = require("acl");
	// Don't just use, but also export in case another module needs to use these as well.
	exports.callbacks = conC; 
	//-- For increased module encapsulation, you could also serve templates with module-local 
	//-- paths, but using shared layouts and partials may become tricky
	//var hbs = require('hbs');
	//app.set('views', __dirname + '/views');
	//app.set('view engine', 'handlebars');
	//app.engine('handlebars', hbs.__express);

	// Module's Routes. Please note this is actually under /concepts, because module is attached under /hello
	/* Concepts routes*/
	app.param('id', conC.load);
	app.get('/',  conC.index);
	app.post('/',acl.login, conC.create);
	//this will fork the concept
	app.post('/:id', acl.login, conC.fork);
	app.get('/:id', conC.show);
	app.put('/:id',acl.concept, conC.update);
	//we have to check the request, if it's delete it makes the owner only allowed to delete
	app.delete('/:id',acl.concept, conC.destroy);
