var mongoose = require('mongoose');
var StudentSchema = new mongoose.Schema ({
    name: String,
    phone: String,
    address: String
});

mongoose.model('Student', StudentSchema);
module.exports = mongoose.model('Student');