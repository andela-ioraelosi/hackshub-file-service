// Create the application and define middleware.

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var dropbox = require("dropbox");
var dropboxClient = new dropbox.Client({
    key: "df6n0p9kq2fd7o1",
    secret: "2yxvgwwldx5isf0",
    token: "XRkSV5SnjmAAAAAAAAAAZSpxjFQvLTAsoIZDewTkEiJ4wlF-U7kiE7LKOnrEM4aV"
});

var router = require('./../app/files/routes')(dropboxClient);

module.exports = function () {

  var app = express();

  app.use(multer({
    dest: './uploads/',
    inMemory: true
  }));

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());
  app.use('/api/v1/', router);

  return app;
};
