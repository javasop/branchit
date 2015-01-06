
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Post = mongoose.model('Tutorial')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
    
  var User = mongoose.model('User');
  Post.load(id, function (err, post) {
    if (err) return next(err);
    if (!post) return next(new Error('not found'));
    req.post = post;
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

  Post.list(options, function (err, posts) {
    if (err) return res.render('500');
    Post.count().exec(function (err, count) {
      res.render('posts/index', {
        title: 'Posts',
        posts: posts,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};

/**
 * New post
 */

exports.new = function (req, res){
  res.render('posts/new', {
    title: 'New Post',
    post: new Post({})
  });
};

/**
 * Create a post
 * Upload an image
 */

exports.create = function (req, res) {
  var post = new Post(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  post.user = req.user;
  post.uploadAndSave(images, function (err) {
    if (!err) {
      req.flash('success', 'Successfully created post!');
      return res.redirect('/posts/'+post._id);
    }
    console.log(err);
    res.render('posts/new', {
      title: 'New Post',
      post: post,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Edit an post
 */

exports.edit = function (req, res) {
  res.render('posts/edit', {
    title: 'Edit ' + req.post.title,
    post: req.post
  });
};

/**
 * Update post
 */

exports.update = function (req, res){
  var post = req.post;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  post = extend(post, req.body);

  post.uploadAndSave(images, function (err) {
    if (!err) {
      return res.redirect('/posts/' + post._id);
    }

    res.render('posts/edit', {
      title: 'Edit Post',
      post: post,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Show
 */

exports.show = function (req, res){
  res.render('posts/show', {
    title: req.post.title,
    post: req.post
  }
  );
};

/**
 * Delete an post
 */

exports.destroy = function (req, res){
  var post = req.post;
  post.remove(function (err){
    req.flash('info', 'Deleted successfully');
    res.redirect('/posts');
  });
};
