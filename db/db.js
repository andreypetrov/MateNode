var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI).catch(function (reason) {
    console.log('Unable to connect to the mongodb mlab instance. Error:: ', reason);
});

