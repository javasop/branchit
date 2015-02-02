var exports = module.exports;
var mongoose = require('mongoose')
var Concept = mongoose.model('Tutorial')


/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');
  Concept.load(id, function (err, concept) {
    if (err) return next(err);
    if (!concept) return next(new Error('not found'));
    req.concept = concept;
    next();
  });
};

/**
 * List
 */

exports.index = function (req, res){
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
  var perPage = 30;
  var options = {
    perPage: perPage,
    page: page
  };

  Concept.list(options, function (err, concepts) {
    if (err) return res.render('500');
    Concept.count().exec(function (err, count) {
      res.send({
        title: 'Concepts',
        concepts: concepts,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};

/**
 * Create a concept
 * Upload an image
 */

exports.create = function (req, res) {
  var concept = new Concept(req.body);
/*  var images = req.files.image
    ? [req.files.image]
    : undefined;*/

  concept.owner = req.user;
  concept.save(function (err) {
    if (err){
	  res.status(500);
	  res.send(
	  {
		  error:err
	  }
	  );
    }
    else{
      res.send('Successfully created concept!');
    }

  });
};

exports.fork = function (req, res) {
  var concept = req.concept;
/*  var images = req.files.image
    ? [req.files.image]
    : undefined;*/
  concept.owner = req.user;
  //reset contributors for the forked concept
  concept.contributors = [];
  concept.save(function (err) {
    if (err){
	  res.status(500);
	  res.send(
	  {
		  error:err
	  }
	  );
    }
    else{
      res.send('Successfully created concept!');
    }

  });
};


/**
 * Update concept
 */

exports.update = function (req, res){
  var concept = req.concept;
 /* var images = req.files.image
    ? [req.files.image]
    : undefined;
*/
  // make sure no one changes the user
  delete req.body.user;
  concept = extend(concept, req.body);

  concept.save(function (err) {
    if (err){
	  res.status(500);
	  res.send(
	  {
		  error:err
	  }
	  );
    }
    else{
      res.send('Successfully created concept!');
    }

  });
};

/**
 * Show
 */

exports.show = function (req, res){
  res.send({
    title: req.concept.title,
    concept: req.concept
  }
  );
};

/**
 * Delete an concept
 */

exports.destroy = function (req, res){
  var concept = req.concept;
  concept.remove(function (err){
 	if (err){
	  res.status(500);
	  res.send(
	  {
		  error:err
	  }
	  );
    	}
    else{
      res.send('Successfully deleted concept!');
    }


  });
};
