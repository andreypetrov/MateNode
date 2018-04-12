
var express = require('express');
var bodyParser = require('body-parser');
var student = require('../model/student');

var router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

/* GET all students from database. */
router.get('/', function (req, res) {
    student.find({}, function (err, students) {
        if (err) {
            return res.status(500).send("There was a problem finding the students");
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(students);
        }
    })
});

module.exports = router;