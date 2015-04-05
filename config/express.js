// Create the application and define middleware.

'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var router = require('./../app/routes');

module.exports = function () {

  var app = express();

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use('/api/v1/', router);

  return app;
};
