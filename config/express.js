// Create the application and define middleware.

'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./../app/routes');

module.exports = function (db) {

  var app = express();
  var router = express.Router();

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use('/api/v1/', router);

  // Pass the router middleware to the routes index file.
  //routes(router);

  return app;
};
