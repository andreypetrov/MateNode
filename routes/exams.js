const express = require('express');
const Exam = require('../model/exam');

const router = express.Router();

const createDbQueryFromRequest = function (req) {
    let query = {};
    if (req.query.subjectCode) query.subjectCode = req.query.subjectCode;
    if (req.query.variant) query.variant = req.query.variant;
    return query;
};

/**
 * GET exams. Optionally filter by subjectCode and variant (compound unique index)
 */
router.get('/', function (req, res, next) {
    Exam.find(createDbQueryFromRequest(req)).then(function (exam) {
        return res.status(200).send(exam);
    }).catch(next);
});


/**
 * Create a new exam
 */
router.post('/', function (req, res, next) {
    Exam.create(req.body).then(function (exam) {
        res.status(200).send(exam);
    }).catch(next);
});

/**
 * Delete an exam with given id from database
 */
router.delete('/:id', function (req, res, next) {
    Exam.findByIdAndRemove(req.params.id).then(function (exam) {
        res.status(200).json("Exam was deleted.");
    }).catch(next);
});

/**
 * GET an exam by id
 */
router.get('/:id', function (req, res, next) {
    Exam.findById(req.params.id).then(function (exam) {
        return res.status(200).send(exam);
    }).catch(next);
});


/**
 * Update an exam by given id
 */
router.put('/:id', function (req, res, next) {
    Exam.findOneAndUpdate({_id:req.params.id}, req.body, {new: true}).then(function(exam){
        res.status(200).send(exam);
    }).catch(next);
});

module.exports = router;