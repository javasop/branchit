
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var post = req.post;
  utils.findByParam(post.feedbacks, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var post = req.post;
  var user = req.user;
  if (!req.body.body) return res.redirect('/posts/'+ post.id);

  post.addFeedback(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/posts/'+ post.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var post = req.post;
  post.removeFeedback(req.param('commentId'), function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/posts/' + post.id);
  });
};
