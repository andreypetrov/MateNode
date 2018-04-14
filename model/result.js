var mongoose = require('mongoose');
var student = require('../model/student');
var exam = require('../model/exam');

var answerSchema = new mongoose.Schema({
    _id: String,
    text: String
});

var questionSchema = new mongoose.Schema({
    text: String,
    correctAnswer: String,
    answers:[answerSchema],

    //new field
    givenAnswer:String
});

var resultSchema = new mongoose.Schema({
    student: student.schema,
    exam: exam.schema,
    questions:[questionSchema],
    dateStarted:Date,
    dateFinished:Date,
    score:String
});




mongoose.model('Result', resultSchema);
module.exports = mongoose.model('Result');