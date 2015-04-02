'use strict';

var app = require('./../../../config/express')();
var request = require('supertest');

describe('File API endpoints: ', function () {

  describe('GET /api/v1/files', function () {

    it('should respond with json', function (done) {

      request(app)
        .get('/api/v1/files')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          done();
        });
    });

  });

});
