const mongoose = require('mongoose');

const HomeWorkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const HomeWork = mongoose.model('HomeWork', HomeWorkSchema);

module.exports = HomeWork;