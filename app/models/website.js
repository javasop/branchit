
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var config = require('config');
var utils = require('../../lib/utils');
var Schema = mongoose.Schema;


/**
 * Website Schema
 */

var WebsiteSchema = new Schema({
    users: [{
            id:{type: Schema.ObjectId, ref: 'User'},
            role:{type: String} 
        }],
    url: {type: String, default: ''},
    shortcode: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now}
});
/**
 * Validations
 */


/**
 * Pre-remove hook
 */

WebsiteSchema.pre('remove', function(next) {
    next();
});
/**
 * Methods
 */

WebsiteSchema.methods = {
    /**
     * Save article and upload image
     *
     * @param {Object} images
     * @param {Function} cb
     * @api private
     */

    uploadAndSave: function(images, cb) {
        if (!images || !images.length)
            return this.save(cb)

        var imager = new Imager(imagerConfig, 'S3');
        var self = this;
        this.validate(function(err) {
            if (err)
                return cb(err);
            imager.upload(images, function(err, cdnUri, files) {
                if (err)
                    return cb(err);
                if (files.length) {
                    self.image = {cdnUri: cdnUri, files: files};
                }
                self.save(cb);
            }, 'article');
        });
    }

}

/**
 * Statics
 */

WebsiteSchema.statics = {
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

mongoose.model('Website', WebsiteSchema);
