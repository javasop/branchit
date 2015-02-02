require('nodebootstrap-server').setup(function(runningApp) {

	//---- Mounting well-encapsulated application modules
	//---- See: http://vimeo.com/56166857
	//
//TODO: separate this into its own module (name it main config?)
var passport = require('passport')
    runningApp.use(passport.initialize());
    runningApp.use(passport.session());

 	runningApp.use(require('passportConfig'));

	runningApp.use(require('routes')); // attach to root rout

	runningApp.use(require('acl'));

	runningApp.use(require('eyeo'));

	runningApp.use('/users',require('users'));

	runningApp.use('/tutorials',require('tutorials')); // attach to sub-route

	runningApp.use('/concepts',require('concepts')); // attach to sub-route

	module.exports = runningApp;
});
