const express = require('express');
const Student = require('../model/student');
const router = express.Router();


/**
 *  GET all students from database.
 */
router.get('/', function (req, res, next) {
    Student.find({}).then(function (students) {
        return res.status(200).send(students);
    }).catch(next);
});

/**
 * GET a student by id
 */
router.get('/:id', function (req, res, next) {
    Student.findById(req.params.id).then(function (student) {
        return res.status(200).send(student);
    }).catch(next);
});

/**
 * Create a new student
 */
router.post('/', function (req, res, next) {
    Student.create(req.body).then(function (student) {
        res.status(200).send(student);
    }).catch(next);
});

/**
 * Delete a student with given id from database
 */
router.delete('/:id', function (req, res, next) {
    Student.findByIdAndRemove(req.params.id).then(function (student) {
        res.status(200).json("Student " + student.name + " was deleted.");
    }).catch(next);
});

/**
 * Update an student by given id
 */
router.put('/:id', function (req, res, next) {
    Student.findOneAndUpdate({_id:req.params.id}, req.body, {new: true}).then(function(student){
        res.status(200).send(student);
    }).catch(next);
});

module.exports = router;