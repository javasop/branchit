/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var config = require('config');

var Schema = mongoose.Schema;


/**
 * Tutorial Schema
 */

//TODO: mix website model here?
var TutorialSchema = new Schema({
    //this will be the generated tutorial url where users can access the content or embed it in their site
    url: {type: String, trim: true},
    title: {type: String, trim: true},
    owner: {type: Schema.ObjectId, ref: 'User'},
    learners: [{type: Schema.ObjectId, ref: 'User'}],
    concepts: [{type: Schema.ObjectId, ref: 'Concept'}],
    comment: [{
        content: {type: String, default: ''},
        user: {type: Schema.ObjectId, ref: 'User'},
        createdAt: {type: Date, default: Date.now},
    }],
    meta: Schema.Types.Mixed,
    createdAt: {type: Date, default: Date.now}
});

/**
 * Validations
 */

//TutorialSchema.path('title').required(true, 'Tutorial title cannot be blank');

/**
 * Pre-remove hook
 */

TutorialSchema.pre('remove', function (next) {
    next();
});

/**
 * Methods
 */

TutorialSchema.methods = {
    /**
     * Save article and upload image
     *
     * @param {Object} images
     * @param {Function} cb
     * @api private
     */

    uploadAndSave: function (images, cb) {

    },
    /**
     * Add comment
     *
     * @param {User} user
     * @param {Object} comment
     * @param {Function} cb
     * @api private
     */

    addComment: function (user, comment, cb) {

        this.comments.push({
            body: comment.body,
            user: user._id
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

    removeComment: function (commentId, cb) {
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

TutorialSchema.statics = {
    /**
     * Find article by id
     *
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */

    load: function (id, cb) {
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

    list: function (options, cb) {
        var criteria = options.criteria || {}

        this.find(criteria)
            .populate('user', 'name username')
            .sort({'createdAt': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
    }
}

mongoose.model('Tutorial', TutorialSchema);
