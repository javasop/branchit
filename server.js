require('nodebootstrap-server').setup(function(runningApp) {

  //---- Mounting well-encapsulated application modules
  //---- See: http://vimeo.com/56166857
  runningApp.use(require('routes')); // attach to root rout

  runningApp.use(require('eyeo'));

  runningApp.use('/users',require('users'));

  runningApp.use('/tutorials',require('tutorials')); // attach to sub-route

  module.exports = runningApp;

  });
