'use strict';
var FileModel = require('./../models/file.model');

module.exports = function (dropboxClient) {

  return {
    getFiles: function (request, response) {

      FileModel.find({}, function (error, files) {
        if (error) {
          response.json(error);
        }

        response.json(files);
      });
    },

    getFile: function (request, response) {

      var path = request.params.path;
      FileModel.findOne({path: path}, function (error, file) {

        if (error) {
          response.json(error);
        }

        response.json(file);
      });
    },

    createFile: function (request, response) {

      var file = request.files.fileName;
      var options = {
        noOverwrite: true
      };

      dropboxClient.writeFile('/' + file.originalname, file.buffer, options, function (error, fileStat) {
        if (error) {
          response.json(error);
        }

        dropboxClient.makeUrl(fileStat.path, function (error, shareUrl) {
          if (error) {
            response.json(error);
          }

          FileModel.create({
            downloadUrl: shareUrl.url,
            modified: fileStat.modified,
            size: fileStat.size,
            is_dir: fileStat.is_dir,
            path: fileStat.path
          }, function (err, file) {
            if (err) {
              response.json(err);
            }

            response.json({
              message: 'File created successfully.',
              data: file
            });
          });
        });
      });
    }
  };
};
