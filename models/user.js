const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    selected: false,
  },
}, schemaOptions)

module.exports = mongoose.model('User', userSchema);

