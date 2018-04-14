const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema ({
    //_id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
    address: String
});

mongoose.model('Student', studentSchema);
module.exports = mongoose.model('Student');