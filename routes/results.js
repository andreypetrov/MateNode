var express = require('express');
var result = require('../model/result');
var student = require('../model/student');
var exam = require('../model/exam');

var router = express.Router();

/**
 * Create a new result for a given student and a given exam (use studentId and examId)
 */
router.post('/', function (req, res, next) {
    if(!req.body.studentId || !req.body.examId) return res.status(400).send("Please provide studentId and examId");

    var studentModel;
    var examModel;

    student.findById(req.body.studentId).then(function (studentFromDb) {
        studentModel = studentFromDb;
        return exam.findById(req.body.examId);
    }).then(function (examFromDb) {
        examModel = examFromDb;
    }).then(function(){
        return result.create(createResult(studentModel, examModel));
    }).then(function(result){
        return res.status(200).send(result);
    }).catch(function (err) {
        next(err.message);
    });

});

var createResult = function(student, exam) {
    return {
        student: student,
        exam: exam,
        questions:exam.questions,
        dateStarted:Date.now()
    };
};


/**
 * GET results. Optionally filter by examId, studentId, studentName, examSubjectCode, examVariant
 */
router.get('/', function (req, res, next) {
    var query = createDbQueryFromRequest(req);
    result.find(query, function (err, exam) {
        if (err) next(err.message);
        else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(exam);
        }
    });
});

var createDbQueryFromRequest = function (req) {
    var query = {};

    //primary
    if (req.query.studentId) {
        query['student._id'] = req.query.studentId;
    }
    if (req.query.examId) {
        query['exam._id'] = req.query.examId;
    }

    //secondary
    if (req.query.studentName) {
        query['student.name'] = req.query.studentName;
    }

    if (req.query.examSubjectCode) {
        query['exam.subjectCode'] = req.query.examSubjectCode;
    }

    if (req.query.examVariant){
        query['exam.variant'] = req.query.examVariant;
    }

    return query;
};


/**
 * Delete a result with given id from database. Needed for testing mostly
 */
router.delete('/:id', function (req, res) {
    result.findByIdAndRemove(req.params.id, function (err, result) {
        if (err) next(err.message);
        if (!result) res.status(200).send("No such result");
        else res.status(200).send("Result was deleted.");
    });
});


module.exports = router;