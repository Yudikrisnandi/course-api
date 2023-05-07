const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const { Schema } = mongoose;

const listSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  position: {
    type: Number
  },
}, schemaOptions)

module.exports = mongoose.model('List', listSchema);

