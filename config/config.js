'use strict';

module.exports = function () {
  return {
    db: {
      development: {
        uri: 'mongodb://localhost:27017/hackshub-file-service-db',
        options: {
          user: '',
          pass: ''
        }
      },

      test: {
        uri: 'mongodb://localhost:27017/hackshub-file-service-db-test',
        options: {
          user: '',
          pass: ''
        }
      }
    },

    port: process.env.PORT || 5555
  };
};
