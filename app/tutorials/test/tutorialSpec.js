//testing the module

/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , should = require('should')
    , request = require('supertest')
    , app = require('../../../server')
    , context = describe
    , Tutorial = mongoose.model('Tutorial')
var cookies, count, tutId;

/**
 * Tutorials tests
 */


//I want to write test cases for crud tutorials
// login first

describe('Tutorials', function () {

    describe('POST /tutorials', function () {
        describe('Invalid parameters', function () {
            before(function (done) {
                Tutorial.count(function (err, cnt) {
                    count = cnt
                    done()
                })
            })

            it('no title - should respond with errors', function (done) {
                request(app)
                    .post('/tutorials')
                    .expect(500)
                    .end(done)
            })

            it('should not save the tutorial to the database', function (done) {
                Tutorial.count(function (err, cnt) {
                    count.should.equal(cnt)
                    done()
                })
            })
        })

        describe('Valid parameters', function () {
            before(function (done) {
                Tutorial.count(function (err, cnt) {
                    count = cnt
                    done()
                })
            })

            it('should return ok when inserting', function (done) {
                request(app)
                    .post('/tutorials')
                    .field('title', 'test')
		    .expect(hasId)
                    .expect(200)
                    .end(done)

		    function hasId(res) {
			    if(!res.body.Tutorial){
				    throw new Error("there's no tutroial attached to the response")
			    }
			    tutId = res.body.Tutorial._id;

		    }
            })
    	    //test update
	    //test delete
            it('should insert a record to the database', function (done) {
                Tutorial.count(function (err, cnt) {
                    cnt.should.equal(count + 1)
                    done()
                })
            })

            it('should save the tutorial to the database', function (done) {
                Tutorial.findOne({title: 'test'}).exec(function (err, tutorial) {
                    should.not.exist(err)
                    tutorial.should.be.an.instanceOf(Tutorial)
                    done()
                })
            })
	    it('should update the previously inserted tutroial',function(done){
   		request(app)
                    .put('/tutorials/'+tutId)
                    .field('title', 'updatedTest')
                    .expect(200)
                    .end(done)
	    })
    	    it('should save the updated tutorial to the database', function (done) {
                Tutorial.findOne({title: 'updatedTest'}).exec(function (err, tutorial) {
                    should.not.exist(err)
                    tutorial.should.be.an.instanceOf(Tutorial)
                    done()
                })
            })

	    it('should delete the previously inserted tutroial',function(done){
   		request(app)
                    .delete('/tutorials/'+tutId)
                    .expect(200)
                    .end(done)
	    })
    	    it('should save the deletion of tutorial to the database', function (done) {
                Tutorial.findOne({title: 'updatedtest'}).exec(function (err, tutorial) {
                    should.not.exist(err)
		    should.not.exist(tutorial);
                    done()
                })
            })

        })
    })
    /*testing Sign in*/
     after(function (done) {
        Tutorial.find({title: 'test'}).remove().exec(function (err) {
            if (!err)
                done();
        });
    })
    
})
