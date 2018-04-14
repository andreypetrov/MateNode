var express = require('express');
var result = require('../model/result');
var student = require('../model/student');
var exam = require('../model/exam');

var router = express.Router();

var createDbQueryFromRequest = function (req) {
    var query = {};
    if (req.query.subjectCode) query.subjectCode = req.query.subjectCode;
    if (req.query.variant) query.variant = req.query.variant;
    if (req.query.studentName) {
        query['student.name'] = req.query.studentName;
    }
    if (req.query.studentId) {
        query['student._id'] = req.query.studentId;
    }
    return query;
};


/**
 * Create a new result for given student and given exam (use studentId and examId)
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
        subjectCode: exam.subjectCode,
        subject:exam.subject,
        variant:exam.variant,
        map: exam.map,
        questions:exam.questions,
        student: student,
        dateStarted:Date.now()
    };
};


/**
 * GET results. Optionally filter by subjectCode and variant (compound unique index)
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


module.exports = router;