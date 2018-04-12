var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI).catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Reason: ', reason);
});

mongoose.connection.on('connected', function(){
    console.log("Mongoose default connection is open to MONGODB_URI");
});