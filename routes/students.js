
var express = require('express');
var student = require('../model/student');
var router = express.Router();


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
});

/**
 * Create a new student
 */
router.post('/', function (req, res) {
    student.create({
            name : req.body.name,
            phone : req.body.phone,
            address : req.body.address
        },
        function (err, student) {
            if (err) next(err.message);
            else res.status(200).send(student);
        });
});

/**
 * Delete a student with given id from database
 */
router.delete('/:id', function (req, res) {
    student.findByIdAndRemove(req.params.id, function (err, student) {
        if (err) next(err.message);
        else res.status(200).send("Student "+ student.name +" was deleted.");
    });
});

module.exports = router;