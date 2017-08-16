const mongoose = require('mongoose');

let snippetSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  notes: String,
  language: {
    type: String,
    required: true
  }
  tags: String
});

module.exports = mongoose.model('Snippet', snippetSchema);
