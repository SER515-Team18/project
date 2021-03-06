/*
Author : Narendra , Archana Madhavan
Version: 1.0
*/
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique : true
  },
  answer: {
    type: String,
    required: true,
    unique : true
  }
})

const HomeWorkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique : true
  },
  grade: {
    type: String,
    required: true,
    unique : true
  },
  questions: [questionSchema]
  
});

const HomeWork = mongoose.model('HomeWork', HomeWorkSchema);

module.exports = HomeWork;