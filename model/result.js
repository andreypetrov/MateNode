var mongoose = require('mongoose');
var student = require('../model/student');

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
    subjectCode: String,
    subject:String,
    variant: String,
    map: {},
    questions:[questionSchema],

    //new fields
    student: student.schema,
    dateStarted:Date,
    dateFinished:Date
});




mongoose.model('Result', resultSchema);
module.exports = mongoose.model('Result');