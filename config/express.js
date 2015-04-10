// Create the application and define middleware.

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var dropbox = require("dropbox");
var client = new dropbox.Client({
    key: "df6n0p9kq2fd7o1",
    secret: "2yxvgwwldx5isf0"
});
client.authDriver(new dropbox.AuthDriver.NodeServer(8191));
var dropboxClient = client.authenticate(function(error, client) {
  if (error) {
    console.error(error);
  }
});

module.exports = function (dropboxClient) {

  var app = express();

  app.use(multer({
    dest: './uploads/',
    inMemory: true
  }));

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  var router = require('./../app/files/routes')(dropboxClient);

  app.use(bodyParser.json());
  app.use('/api/v1/', router);

  return app;
};
