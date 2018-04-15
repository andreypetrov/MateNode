const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    _id: String,
    imageUrl: String,
    text: String
});

mongoose.model('Answer', answerSchema);
module.exports = mongoose.model('Answer');