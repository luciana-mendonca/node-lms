var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Student = require('../models/student');
var Class = require('../models/class');



// Student classes
router.get('/classes', function(req, res, next) {
  Student.getStudentByUsername(req.user.username, function(err, student) {
    if(err) {
      throw err;
    }
    res.render('students/classes', {student: student});
  });
});

module.exports = router;
