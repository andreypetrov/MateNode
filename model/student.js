var mongoose = require('mongoose');
var studentSchema = new mongoose.Schema ({
    name: String,
    phone: String,
    address: String
});

mongoose.model('Student', studentSchema);
module.exports = mongoose.model('Student');