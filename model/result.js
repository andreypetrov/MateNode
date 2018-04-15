const mongoose = require('mongoose');
const student = require('../model/student');
const exam = require('../model/exam');
const question = require('../model/question');

const resultSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    student: student.schema,
    exam: exam.schema,
    questions:[question.schema],
    dateStarted:Date,
    dateFinished:Date,
    score:String
});

mongoose.model('Result', resultSchema);
module.exports = mongoose.model('Result');