// Create the application and define middleware.

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var router = require('./../app/files/routes')();

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
