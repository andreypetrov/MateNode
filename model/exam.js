const mongoose = require('mongoose');
const question = require('../model/question');

// TODO: if needed define map schema and model in a separate file
// var mapSchema = new mongoose.Schema({
//
// });

const examSchema = new mongoose.Schema({
    subjectCode: String,
    subjectName:String,
    variant: String,
    map: {},
    questions:[question.schema]
});

mongoose.model('Exam', examSchema);
module.exports = mongoose.model('Exam');