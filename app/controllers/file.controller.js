'use strict';

var FileModel = require('./../models/file.model');

module.exports = {
  getFiles: function (request, response) {

    FileModel.find(function (err, files) {
      if (err) {
        response.json(err);
      }

      response.json(files);
    });
  },

  createFile: function (request, response) {
    var fileObject = request.body;

    FileModel.create(fileObject, function (err, file) {
      if (err) {
        response.json(err);
      }

      response.json(file);
    });
  }
};
