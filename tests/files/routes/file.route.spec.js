'use strict';

var app = require('./../../../config/express')();
var config = require('./../../../config/config')();
var mongoose = require('mongoose');
var request = require('supertest');
var FileModel = require('./../../../app/files/models/file.model');

mongoose.connect(config.db[process.env.NODE_ENV].uri, config.db[process.env.NODE_ENV].options, function (err) {
  if (err) {
    console.error('Could not connect to MongoDB.');
    console.log(err);
  }
});

describe('File API endpoints: ', function () {

  describe('POST /api/v1/files', function () {

    beforeEach(function (done) {
      FileModel.remove({},function (err) {
        if (err) {
          console.log(err);
        }
      });
      done();
    });

    it('should add a new file', function (done) {

      request(app)
        .post('/api/v1/files')
        .attach('fileName', 'test_files/avatar.png','avatar.png')
        .expect(200)
        .end(function (err, response) {
          FileModel.findOne({ path: /avatar/ }, function (err, file) {
            expect(file).not.toBeNull();
          });
          done();
        });
    });

    afterEach(function (done) {
      FileModel.remove({},function (err) {
        if (err) {
          console.log(err);
        }
      });
      done();
    });

  });

  describe('GET /api/v1/files', function () {

    beforeEach(function (done) {

      request(app)
        .post('/api/v1/files')
        .attach('fileName', 'test_files/avatar.png','avatar.png')
        .attach('fileName', 'test_files/avatar.png','avatar.png')
        .attach('fileName', 'test_files/avatar.png','avatar.png')
        .attach('fileName', 'test_files/avatar.png','avatar.png')
        .expect(200)
        .end(function (err, response) {
          if (err) {
            console.log(err);
          }
          done();
        });

    });

    it('should respond with an array of file objects', function (done) {

      request(app)
        .get('/api/v1/files')
        .expect(200)
        .end(function (err, response) {
          expect(response.body.length).toBeGreaterThan(0);
          done();
        });
    });

    afterEach(function (done) {
      FileModel.remove({},function (err) {
        if (err) {
          console.log(err);
        }
      });
      done();
    });

  });

  describe('PUT /api/v1/files/:path', function () {

    beforeEach(function (done) {

      request(app)
        .post('/api/v1/files')
        .attach('fileName', 'test_files/hello.txt','hello.txt')
        .expect(200)
        .end(function (err, response) {
          if (err) {
            console.log(err);
          }
          done();
        });

    });

    it('should edit a file.', function (done) {

      request(app)
        .put('/api/v1/files/hello.txt')
        .attach('fileName', 'test_files/goodbye.txt','hello.txt')
        .expect(200)
        .end(function (err, response) {
          expect(response.body.message).toEqual('File updated successfully.');
          done();
        });
    });

    afterEach(function (done) {
      FileModel.remove({},function (err) {
        if (err) {
          console.log(err);
        }
      });
      done();
    });

  });

  describe('DELETE /api/v1/files/:path', function () {

    beforeEach(function (done) {

      request(app)
        .post('/api/v1/files')
        .attach('fileName', 'test_files/hello.txt','hello.txt')
        .expect(200)
        .end(function (err, response) {
          if (err) {
            console.log(err);
          }
          done();
        });

    });

    it('should edit a file.', function (done) {

      request(app)
        .delete('/api/v1/files/hello.txt')
        .expect(200)
        .end(function (err, response) {
          expect(response.body.message).toEqual('File deleted successfully.');
          done();
        });
    });

    afterEach(function (done) {
      FileModel.remove({},function (err) {
        if (err) {
          console.log(err);
        }
      });
      done();
    });

  });

});
