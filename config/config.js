'use strict';

module.exports = function () {
  return {
    db: {
      development: {
        uri: 'mongodb://localhost/hackshub-file-service-db',
        options: {
          user: '',
          pass: ''
        }
      },

      test: {

      }
    },

    port: process.env.PORT || 5555
  };
};
