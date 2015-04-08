'use strict';
var config = require('./../../../config/config')();
var secret = config.client_secret;

var http = require('http');
var FileModel = require('./../models/file.model');

module.exports = {

  createFile: function (request, response) {
    var fileObject = request.body;

    FileModel.create(fileObject, function (err, file) {
      if (err) {
        response.json(err);
      }

      response.json(file);
    });
  },

  getFiles: function (request, response) {

    http.get("http://api.4sync.com/v0/files.json?oauth_consumer_key=" + secret, function (res) {
      var body = '';
      res.on('data', function (data) {
        body += data;
      });

      res.on('end', function () {
        response.json(JSON.parse(body));
      });
    });
  }
};
