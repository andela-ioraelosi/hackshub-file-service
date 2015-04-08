'use strict';

var files = require('./../controllers/file.controller.js');

module.exports = function (router) {

  router.route('/files')
    .get(files.getFiles)
    .post(files.createFile);
};
