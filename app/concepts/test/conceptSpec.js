//testing the module

/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
, should = require('should')
, request = require('supertest')
, app = require('../../../server')
, context = describe
, Concept = mongoose.model('Concept')
var cookies, count, conId, fconId;

/**
 * Concepts tests
 */


//I want to write test cases for crud concepts
/* login first
describe('user.signin', function() {
	it('should signin', function(done) {
	         request(app)
                    .post('/users/login')
                    .field('email', 'test@test.com')
                    .field('password', 'test')
                    .expect(302)
                    .end(function(err,res){
			done();
		    })
	});
});
*/
describe('Concepts', function () {

	describe('POST /concepts', function () {
		describe('Invalid parameters', function () {
			before(function (done) {
				Concept.count(function (err, cnt) {
					count = cnt
					done()
				})
			})
			it('no title - should respond with errors', function (done) {
				request(app)
				.post('/concepts')
				.expect(500)
				.end(done)
			})

			it('should not save the concept to the database', function (done) {
				Concept.count(function (err, cnt) {
					count.should.equal(cnt)
					done()
				})
			})
		})

		describe('Valid parameters', function () {
			before(function (done) {
				Concept.count(function (err, cnt) {
					count = cnt
					done()
				})
			})

			it('should return ok when inserting', function (done) {
				request(app)
				.post('/concepts')
				.field('title', 'test')
				.expect(hasId)
				.expect(200)
				.end(done)

				function hasId(res) {
					if(!res.body.Concept){
						throw new Error("there's no tutroial attached to the response")
					}

					conId = res.body.Concept._id;

				}
			})
			it('should insert a record to the database', function (done) {
				Concept.count(function (err, cnt) {
					cnt.should.equal(count + 1)
					done()
				})
			})

			it('should save the concept to the database', function (done) {
				Concept.findOne({title: 'test'}).exec(function (err, concept) {
					should.not.exist(err)
					concept.should.be.an.instanceOf(Concept)
					done()
				})
			})
			it('should return ok when forking', function (done) {
				request(app)
				.post('/concepts/'+conId)
				.expect(hasId)
				.expect(200)
				.end(done)

				function hasId(res){
					if(!res.body.Concept._id){
						throw new Error("concept doesn't contain id");
					}

					fconId = res.body.Concept._id;

				}

			})
			it('should insert a record to the database', function (done) {
				Concept.count(function (err, cnt) {
					cnt.should.equal(count + 2)
					done()
				})
			})

			it('should save the concept to the database', function (done) {
				Concept.findOne({_id: fconId}).exec(function (err, concept) {
					should.not.exist(err)
					concept.should.be.an.instanceOf(Concept)
					done()
				})
			})

			it('should update the previously inserted concept',function(done){
				request(app)
				.put('/concepts/'+conId)
				.field('title', 'updatedTest')
				.expect(200)
				.end(done)
			})
			it('should save the updated concept to the database', function (done) {
				Concept.findOne({title: 'updatedTest'}).exec(function (err, concept) {
					should.not.exist(err)
					concept.should.be.an.instanceOf(Concept)
					done()
				})
			})

			it('should delete the previously inserted concept',function(done){
				request(app)
				.delete('/concepts/'+conId)
				.expect(200)
				.end(done)
			})
			it('should save the deletion of concept to the database', function (done) {
				Concept.findOne({title: 'updatedtest'}).exec(function (err, concept) {
					should.not.exist(err)
					should.not.exist(concept);
				done()
				})
			})

		})
	})
	after(function (done) {
		Concept.find({title: 'test'}).remove().exec(function (err) {
			if (!err)
			done();
		});
		Concept.findOne({_id: fconId}).remove().exec(function (err) {
			if (!err)
			done();
		});
	})

})
