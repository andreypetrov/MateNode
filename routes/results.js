const express = require('express');
const Result = require('../model/result');
const Student = require('../model/student');
const Exam = require('../model/exam');

const router = express.Router();

/**
 * Create a new result for a given student and a given exam (use studentId and examId)
 */
router.post('/', function (req, res, next) {
    if (!req.body.studentId || !req.body.examId) return res.status(400).send("Please provide studentId and examId");

    let student;
    let exam;

    Student.findById(req.body.studentId).then(function (studentFromDb) {
        student = studentFromDb;
        return Exam.findById(req.body.examId);
    }).then(function (examFromDb) {
        exam = examFromDb;
    }).then(function () {
        return Result.create(createResult(student, exam));
    }).then(function (result) {
        return res.status(200).send(result);
    }).catch(next);

});

const createResult = function (student, exam) {
    return {
        student: student,
        exam: exam,
        questions: exam.questions,
        dateStarted: Date.now()
    };
};


/**
 * GET results. Optionally filter by examId, studentId, studentName, examSubjectCode, examVariant
 */
router.get('/', function (req, res, next) {
    const query = createDbQueryFromRequest(req);
    Result.find(query).then(function (result) {
        return res.status(200).send(result);
    }).catch(next);
});

const createDbQueryFromRequest = function (req) {
    let query = {};

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
    if (req.query.examVariant) {
        query['exam.variant'] = req.query.examVariant;
    }
    return query;
};


/**
 * GET a result by result id
 */
router.get('/:id', function (req, res, next) {
    Result.findById(req.params.id).then(function (result) {
        return res.status(200).send(result);
    }).catch(next);
});

/**
 * Delete a result with given id from database. Needed for testing mostly
 */
router.delete('/:id', function (req, res, next) {
    Result.findByIdAndRemove(req.params.id).then(function (result) {
        if (!result) res.status(200).send("No such result");
        else res.status(200).send("Result was deleted.");
    }).catch(next);
});


/**
 * finish an exam result. Calculate the final score of the student and timestamp the end of it.
 */
router.post('/finish', function (req, res, next) {
    Result.findById(req.body.resultId).then(function (result) {
        result.score = calculateScore(result);
        result.dateFinished = Date.now();
        return result.save();
    }).then(function (updatedResult) {
        return res.status(200).send(updatedResult);
    }).catch(next);
});

/**
 * finish an exam result. Calculate the final score of the student and timestamp the end of it.
 */
router.post('/answer', function (req, res, next) {
    Result.findById(req.body.resultId).then(function (result) {
        result.questions.id(req.body.questionId).givenAnswer = req.body.answerId;
        return result.save();
    }).then(function(result){
        return res.status(200).send(result);
    }).catch(next);
});

/**
 * Score in the format "X out of Y", where X is the number of correct answers and Y is the number of questions answered.
 * If student did not make any mistakes, then those two numbers should match.
 * @param result
 * @returns {string}
 */
const calculateScore = function (result) {
    const questionsCount = result.questions.length;
    const correctAnswersCount = result.questions.filter(question => question.givenAnswer === question.correctAnswer).length;
    return correctAnswersCount + " out of " + questionsCount;
};

module.exports = router;