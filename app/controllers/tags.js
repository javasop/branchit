/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Tutorial = mongoose.model('Tutorial');

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

  Tutorial.list(options, function(err, tutorials) {
    if (err) return res.render('500');
    Tutorial.count(criteria).exec(function (err, count) {
      res.render('tutorials/index', {
        title: 'Tutorials tagged ' + req.param('tag'),
        tutorials: tutorials,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};
