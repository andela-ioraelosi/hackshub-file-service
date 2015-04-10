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
      },

      staging: {

      },

      production: {
        uri: 'mongodb://ifeanyio:dexter@ds059471.mongolab.com:59471/hackshub-file-service',
        options: {
          user: '',
          pass: ''
        }
      }
    },

    port: process.env.PORT || 5555,
    client_secret: process.env.FOUR_SYNC_KEY
  };
};
