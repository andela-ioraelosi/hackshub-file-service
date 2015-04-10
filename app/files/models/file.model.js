'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FileSchema = new Schema({
  downloadUrl: {type: String, required: true},
  modified: {type: String},
  size: {type: String},
  is_dir: {type: Boolean},
  path: {type: String, required: true}
});

module.exports = mongoose.model('FileModel', FileSchema);
