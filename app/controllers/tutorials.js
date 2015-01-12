
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Tutorial = mongoose.model('Tutorial')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');
  Tutorial.load(id, function (err, tutorial) {
    if (err) return next(err);
    if (!tutorial) return next(new Error('not found'));
    req.tutorial = tutorial;
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

  Tutorial.list(options, function (err, tutorials) {
    if (err) return res.render('500');
    Tutorial.count().exec(function (err, count) {
      res.render('tutorials/index', {
        title: 'Tutorials',
        tutorials: tutorials,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};

/**
 * New tutorial
 */

exports.new = function (req, res){
  res.render('tutorials/new', {
    title: 'New Tutorial',
    tutorial: new Tutorial({})
  });
};

/**
 * Create a tutorial
 * Upload an image
 */

exports.create = function (req, res) {
  var tutorial = new Tutorial(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  tutorial.user = req.user;
  tutorial.uploadAndSave(images, function (err) {
    if (!err) {
      req.flash('success', 'Successfully created tutorial!');
      return res.redirect('/tutorials/'+tutorial._id);
    }
    console.log(err);
    res.render('tutorials/new', {
      title: 'New Tutorial',
      tutorial: tutorial,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Edit an tutorial
 */

exports.edit = function (req, res) {
  res.render('tutorials/edit', {
    title: 'Edit ' + req.tutorial.title,
    tutorial: req.tutorial
  });
};

/**
 * Update tutorial
 */

exports.update = function (req, res){
  var tutorial = req.tutorial;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  tutorial = extend(tutorial, req.body);

  tutorial.uploadAndSave(images, function (err) {
    if (!err) {
      return res.redirect('/tutorials/' + tutorial._id);
    }

    res.render('tutorials/edit', {
      title: 'Edit Tutorial',
      tutorial: tutorial,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Show
 */

exports.show = function (req, res){
  res.render('tutorials/show', {
    title: req.tutorial.title,
    tutorial: req.tutorial
  }
  );
};

/**
 * Delete an tutorial
 */

exports.destroy = function (req, res){
  var tutorial = req.tutorial;
  tutorial.remove(function (err){
    req.flash('info', 'Deleted successfully');
    res.redirect('/tutorials');
  });
};
