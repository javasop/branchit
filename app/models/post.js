
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Imager = require('imager');
var config = require('config');

var imagerConfig = require(config.root + '/config/imager.js');
var utils = require('../../lib/utils');

var Schema = mongoose.Schema;




/**
 * Post Schema
 */

//TODO: mix website model here?
//but we don't want to sent all information back to client?
//what about feedback sub-document?
var PostSchema = new Schema({
    post_url: {type: String, trim: true},
    website_id: {type: Schema.ObjectId, ref: 'Website'},
    poll_title: {type: String, default: '', trim: true},
    poll_options:[{
           title:{type:Array}
        }],
    poll_status :{type: String, default: 'draft', trim: true},
    comment: [{
            content: {type: String, default: ''},
            user: {type: Schema.ObjectId, ref: 'User'},
            createdAt: {type: Date, default: Date.now},
            poll_option: {type:String}
    }],
    createdAt: {type: Date, default: Date.now}
});

/**
 * Validations
 */

//PostSchema.path('title').required(true, 'Post title cannot be blank');

/**
 * Pre-remove hook
 */

PostSchema.pre('remove', function(next) {
    next();
});

/**
 * Methods
 */

PostSchema.methods = {
    /**
     * Save article and upload image
     *
     * @param {Object} images
     * @param {Function} cb
     * @api private
     */

    uploadAndSave: function(images, cb) {
        
    },
    /**
     * Add comment
     *
     * @param {User} user
     * @param {Object} comment
     * @param {Function} cb
     * @api private
     */

    addComment: function(user, comment, cb) {
        var notify = require('../mailer');

        this.comments.push({
            body: comment.body,
            user: user._id
        });

        if (!this.user.email)
            this.user.email = 'email@product.com';
        notify.comment({
            article: this,
            currentUser: user,
            comment: comment.body
        });

        this.save(cb);
    },
    /**
     * Remove comment
     *
     * @param {commentId} String
     * @param {Function} cb
     * @api private
     */

    removeComment: function(commentId, cb) {
        var index = utils.indexof(this.comments, {id: commentId});
        if (~index)
            this.comments.splice(index, 1);
        else
            return cb('not found');
        this.save(cb);
    }
}

/**
 * Statics
 */

PostSchema.statics = {
    /**
     * Find article by id
     *
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */

    load: function(id, cb) {
        this.findOne({_id: id})
                .populate('user', 'name email username')
                .populate('comments.user')
                .exec(cb);
    },
    /**
     * List articles
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    list: function(options, cb) {
        var criteria = options.criteria || {}

        this.find(criteria)
                .populate('user', 'name username')
                .sort({'createdAt': -1}) // sort by date
                .limit(options.perPage)
                .skip(options.perPage * options.page)
                .exec(cb);
    }
}

mongoose.model('Post', PostSchema);
