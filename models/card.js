const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const { Schema } = mongoose;

const cardSchema = new Schema({
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'task'
  },
  position: {
    type: Number
  },
}, schemaOptions)

module.exports = mongoose.model('Card', cardSchema);

