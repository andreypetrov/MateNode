
var express = require('express');
var bodyParser = require('body-parser');
var exam = require('../model/exam');

var router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


/**
 *  GET all exams from database.
 */
router.get('/', function (req, res, next) {
    exam.find({}, function (err, exams) {
        if (err) next(err.message);
        else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(exams);
        }
    });
});

/**
 * GET exam by name and variant
 * TODO make a query on name and variant (compound unique index)
 */
router.get('/:name/:variant', function (req, res, next) {
    exam.find({}, function (err, exam) {
        if (err) next(err.message);
        else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(exam);
        }
    });
})

module.exports = router;