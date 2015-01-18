require('nodebootstrap-server').setup(function(runningApp) {

  //---- Mounting well-encapsulated application modules
  //---- See: http://vimeo.com/56166857
  runningApp.use('/hello',require('hello')); // attach to sub-route

  runningApp.use('/auth',require('auth'));


  runningApp.use(require('routes')); // attach to root rout

  runningApp.use(require('eyeo')); 


  });
