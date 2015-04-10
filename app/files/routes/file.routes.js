'use strict';

module.exports = function (router, dropboxClient) {

  var files = require('./../controllers/file.controller.js')(dropboxClient);

  router.route('/files')
    .get(files.getFiles)
    .post(files.createFile);

  router.route('/files/:path')
    .get(files.getFile)
    .put(files.updateFile)
    .delete(files.deleteFile);
};
