const mongoose = require('mongoose');

// var mapSchema = new mongoose.Schema({
//
// });

const answerSchema = new mongoose.Schema({
    _id: String,
    text: String
});

const questionSchema = new mongoose.Schema({
    _id: String,
    text: String,
    correctAnswer: String,
    answers:[answerSchema]
});

const examSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    subjectCode: String,
    subject:String,
    variant: String,
    map: {},
    questions:[questionSchema],
    student:String
});




mongoose.model('Exam', examSchema);
module.exports = mongoose.model('Exam');