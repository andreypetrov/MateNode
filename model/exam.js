var mongoose = require('mongoose');

// var mapSchema = new mongoose.Schema({
//
// });

var answerSchema = new mongoose.Schema({
    _id: String,
    text: String
});

var questionSchema = new mongoose.Schema({
    text: String,
    correctAnswer: String,
    answers:[answerSchema]
});

var examSchema = new mongoose.Schema({
    subjectCode: String,
    subject:String,
    variant: String,
    map: {},
    questions:[questionSchema]
});




mongoose.model('Exam', examSchema);
module.exports = mongoose.model('Exam');