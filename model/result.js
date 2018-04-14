const mongoose = require('mongoose');
const student = require('../model/student');
const exam = require('../model/exam');

const answerSchema = new mongoose.Schema({
    _id: String,
    text: String
});

const questionSchema = new mongoose.Schema({
    _id: String,
    text: String,
    correctAnswer: String,
    answers:[answerSchema],

    //new field
    givenAnswer:String
});

const resultSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    student: student.schema,
    exam: exam.schema,
    questions:[questionSchema],
    dateStarted:Date,
    dateFinished:Date,
    score:String
});




mongoose.model('Result', resultSchema);
module.exports = mongoose.model('Result');