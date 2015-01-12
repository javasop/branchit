
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../server')
  , context = describe
  , User = mongoose.model('User')
  , Tutorials = mongoose.model('Tutorial')
  , agent = request.agent(app)

var count

/**
 * Tutorialss tests
 */

describe('Tutorial', function () {
  before(function (done) {
    // create a user
    var user = new User({
      email: 'foobar@example.com',
      name: 'Foo bar',
      username: 'foobar',
      password: 'foobar'
    })
    user.save(done)
  })

  describe('GET /tutorials', function () {
    it('should respond with Content-Type text/html', function (done) {
      agent
      .get('/tutorials')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(/Tutorials/)
      .end(done)
    })
  })

  describe('GET /tutorials/new', function () {
    context('When not logged in', function () {
      it('should redirect to /login', function (done) {
        agent
        .get('/tutorials/new')
        .expect('Content-Type', /plain/)
        .expect(302)
        .expect('Location', '/login')
        .expect(/Moved Temporarily/)
        .end(done)
      })
    })

    context('When logged in', function () {
      before(function (done) {
        // login the user
        agent
        .post('/users/session')
        .field('email', 'foobar@example.com')
        .field('password', 'foobar')
        .end(done)
      })

      it('should respond with Content-Type text/html', function (done) {
        agent
        .get('/tutorials/new')
        .expect('Content-Type', /html/)
        .expect(200)
        .expect(/New Tutorials/)
        .end(done)
      })
    })
  })

  describe('POST /tutorials', function () {
    context('When not logged in', function () {
      it('should redirect to /login', function (done) {
        request(app)
        .get('/tutorials/new')
        .expect('Content-Type', /plain/)
        .expect(302)
        .expect('Location', '/login')
        .expect(/Moved Temporarily/)
        .end(done)
      })
    })

    context('When logged in', function () {
      before(function (done) {
        // login the user
        agent
        .post('/users/session')
        .field('email', 'foobar@example.com')
        .field('password', 'foobar')
        .end(done)
      })

      describe('Invalid parameters', function () {
        before(function (done) {
          Tutorials.count(function (err, cnt) {
            count = cnt
            done()
          })
        })

        it('should respond with error', function (done) {
          agent
          .post('/tutorials')
          .field('title', '')
          .field('body', 'foo')
          .expect('Content-Type', /html/)
          .expect(200)
          .expect(/Tutorials title cannot be blank/)
          .end(done)
        })

        it('should not save to the database', function (done) {
          Tutorials.count(function (err, cnt) {
            count.should.equal(cnt)
            done()
          })
        })
      })

      describe('Valid parameters', function () {
        before(function (done) {
          Tutorials.count(function (err, cnt) {
            count = cnt
            done()
          })
        })

        it('should redirect to the new tutorial page', function (done) {
          agent
          .post('/tutorials')
          .field('title', 'foo')
          .field('body', 'bar')
          .expect('Content-Type', /plain/)
          .expect('Location', /\/tutorials\//)
          .expect(302)
          .expect(/Moved Temporarily/)
          .end(done)
        })

        it('should insert a record to the database', function (done) {
          Tutorials.count(function (err, cnt) {
            cnt.should.equal(count + 1)
            done()
          })
        })

        it('should save the tutorial to the database', function (done) {
          Tutorials
          .findOne({ title: 'foo'})
          .populate('user')
          .exec(function (err, tutorial) {
            should.not.exist(err)
            tutorial.should.be.an.instanceOf(Tutorials)
            tutorial.title.should.equal('foo')
            tutorial.body.should.equal('bar')
            tutorial.user.email.should.equal('foobar@example.com')
            tutorial.user.name.should.equal('Foo bar')
            done()
          })
        })
      })
    })
  })

  after(function (done) {
    require('./helper').clearDb(done)
  })
})
