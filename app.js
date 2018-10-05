if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load(); //in non-production environment, a.k.a. locally, load environmental variables from .env file
}

//open database connection
require('./db/db');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const indexRouter = require('./routes/index');
const studentsRouter = require('./routes/students');
const examsRouter = require('./routes/exams');
const resultsRouter = require('./routes/results');

app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/', indexRouter);

//api header
app.use('/api/v1/',function(req,res,next){
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/exams', examsRouter);
app.use('/api/v1/results', resultsRouter);

setupSwagger = require('./util/swagger');
setupSwagger(app);

handleErrors = require('./util/errors');
handleErrors(app);

module.exports = app;
