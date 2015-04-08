'use strict';

var express = require('express');

var fileRoutes = require('./file.routes');

module.exports = function () {

  var router = express.Router();

  fileRoutes(router);

  return router;
};
