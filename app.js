if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load(); //in non-production environment, a.k.a. locally, load environmental variables from .env file
}

//open database connection
require('./db/db');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');
var examsRouter = require('./routes/exams');
var resultsRouter = require('./routes/results');

app.use('/', indexRouter);
app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/exams', examsRouter);
app.use('/api/v1/results', resultsRouter);

setupSwagger = require('./util/swagger');
setupSwagger(app);

handleErrors = require('./util/errors');
handleErrors(app);

module.exports = app;
