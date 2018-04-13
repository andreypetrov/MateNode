
var express = require('express');
var exam = require('../model/exam');

var router = express.Router();

var createDbQueryFromRequest = function (req) {
    var query = {};
    if (req.query.subjectCode) query.subjectCode = req.query.subjectCode;
    if (req.query.variant) query.variant = req.query.variant;
    return query;
};

/**
 * GET exams. Optionally filter by subjectCode and variant (compound unique index)
 */
router.get('/', function (req, res, next) {
    var query = createDbQueryFromRequest(req);
    exam.find(query, function (err, exam) {
        if (err) next(err.message);
        else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(exam);
        }
    });
});


module.exports = router;