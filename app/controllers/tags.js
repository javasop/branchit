/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Post = mongoose.model('Tutorial');

/**
 * List items tagged with a tag
 */

exports.index = function (req, res) {
  var criteria = { tags: req.param('tag') };
  var perPage = 5;
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
  var options = {
    perPage: perPage,
    page: page,
    criteria: criteria
  };

  Post.list(options, function(err, posts) {
    if (err) return res.render('500');
    Post.count(criteria).exec(function (err, count) {
      res.render('posts/index', {
        title: 'Posts tagged ' + req.param('tag'),
        posts: posts,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};
