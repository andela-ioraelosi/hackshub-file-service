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

  describe('Create File Objects', function () {

    beforeEach(function (done) {
      file = new FileModel({
        filename: 'A random file',
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

    it('should throw an error when saved without a filename', function (done) {
      file.filename = '';

      file.save(function (err, file) {
        expect(err).not.toBeNull();
        done();
      });
    });

    it('should create a file object', function (done) {
      file.filename = "image.jpg";

      file.save(function (err, file) {
        FileModel.find({filename: "image.jpg"}, function (err, file) {
          expect(err).toBeNull();
        });
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

  describe('Edit File Objects: ', function () {

    beforeEach(function (done) {
      file = new FileModel({
        filename: "funny.gif",
        created_at: new Date()
      });
      done();
    });

    it('should update the file object', function () {
      file.save(function (err, file) {
        FileModel.find({filename: "funny.gif"}, function (err, file) {
          file.filename = "not_funny.gif";

          file.save(function (err, file) {
            FileModel.find({filename: "not_funny.gif"}, function (err, file) {
              expect(err).toBeNull();
            });
          });
        });
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

  describe('Delete File Objects: ', function () {

    beforeEach(function (done) {
      file = new FileModel({
        filename: "funny.gif",
        created_at: new Date()
      });
      done();
    });

    it('should delete the file object', function () {
      file.save(function (err, file) {
        file.remove(function (err, file) {
          FileModel.find({filename: "funny.gif"}, function (err, file) {
            expect(file).toBeNull();
          });
        });
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
