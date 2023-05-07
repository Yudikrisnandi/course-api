const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const { Schema } = mongoose;

const boardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'Untitled'
  },
  position: {
    type: Number
  },
  favorite: {
    type: Boolean, 
    default: false, 
  }
}, schemaOptions)

module.exports = mongoose.model('Board', boardSchema);

