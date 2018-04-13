
var express = require('express');
var bodyParser = require('body-parser');
var student = require('../model/student');

var router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


/**
 *  GET all students from database.
 */
router.get('/', function (req, res, next) {
    student.find({}, function (err, students) {
        if (err) next(err.message);
        else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(students);
        }
    });
});

/**
 * GET a student by id
 */
router.get('/:id', function (req, res, next) {
    student.findById(req.params.id, function (err, student) {
        if (err) next(err.message);
        else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(student);
        }
    });
})

module.exports = router;