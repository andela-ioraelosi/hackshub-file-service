'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FileSchema = new Schema({
  filename: {type: String, required: true},
  created_at: {type: Date}
});

module.exports = mongoose.model('FileModel', FileSchema);
