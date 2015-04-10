'use strict';

var express = require('express');

var fileRoutes = require('./file.routes');

module.exports = function (dropboxClient) {

  var router = express.Router();

  fileRoutes(router, dropboxClient);

  return router;
};
