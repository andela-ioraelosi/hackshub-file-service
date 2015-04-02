'use strict';

/*
Module dependencies
 */
var mongoose = require('mongoose');
var config = require('./../../../config/config')();

// Connect to MongoDB
var db = mongoose.connect(config.db.test.uri, config.db.test.options, function (err) {
  if (err) {
    console.error('Could not connect to MongoDB.');
  }
});

var FileModel = require('./../../models/file.model');

/*
Globals
 */
var file;
describe('File Model Unit Tests: ', function () {

  describe('Method Save', function () {

    beforeEach(function (done) {
      file = new FileModel({
        name: 'A random file',
        created_at: new Date()
      });
      done();
    });

    it('should be able to save without problems', function (done) {
      file.save(function (err, file) {
        expect(err).toBeNull();
        done();
      });
    });

    it('should throw an error when saved without a name', function (done) {
      file.name = '';

      file.save(function (err, file) {
        expect(err).not.toBeNull();
        done();
      });
    });

    afterEach(function (done) {
      file.remove(function (err, file) {
        if (err) {
          console.log(err);
        }
      });
      done();
    });

  });

});
