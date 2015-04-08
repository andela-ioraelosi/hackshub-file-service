'use strict';

var app = require('./../config/express')();
var config = require('./../config/config')();
var mongoose = require('mongoose');
var request = require('supertest');
var FileModel = require('./../app/files/models/file.model');

describe('File API endpoints: ', function () {

  beforeEach(function (done) {

    function clearDB () {
      for (var i = 0; i < mongoose.connection.collections.length; i++) {
        mongoose.connection.collections[i].remove();
      }

      return done();
    }

    function reconnect () {
      mongoose.connect(config.db[process.env.NODE_ENV].uri, function (err) {
        if (err) {
          throw err;
        }

        return clearDB();
      });
    }

    function checkState() {
      switch(mongoose.connection.readyState) {
        case 0:
          reconnect();
          break;
        case 1:
          clearDB();
          break;
        default:
          process.nextTick(checkState);
      }
    }

    checkState();
  });

  describe('GET /api/v1/files', function () {

    it('should respond with json', function (done) {

      request(app)
        .get('/api/v1/files')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, response) {
          expect(err).toBeNull();
          expect(response.body).toBeDefined();
          done();
        });
    });

  });

  describe('POST /api/v1/files', function () {

    var post_data = null;

    beforeEach(function () {
      post_data = {
        filename: "happy.jpg",
        created_at: new Date()
      };
    });

    it('should add a new file', function (done) {

      request(app)
        .post('/api/v1/files')
        .send(post_data)
        .expect(200)
        .end(function (err, response) {
          expect(err).toBeNull();
          FileModel.findOne(post_data, function (err, file) {
            expect(file).not.toBeNull();
          });
          done();
        });
    });

  });

  afterEach(function (done) {
    mongoose.disconnect();
    return done();
  });

});
