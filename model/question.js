const mongoose = require('mongoose');
const answer = require('../model/answer');

const questionSchema = new mongoose.Schema({
    _id: String,
    text: String,
    imageUrl: String,
    correctAnswer: String,
    answers:[answer.schema],
    givenAnswer:String,
    category: String
});

mongoose.model('Question', questionSchema);
module.exports = mongoose.model('Question');