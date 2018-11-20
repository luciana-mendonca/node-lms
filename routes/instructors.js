var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Instructor = require('../models/instructor');
var Class = require('../models/class');

// Instructor classes
router.get('/classes', function(req, res, next) {
  Instructor.getInstructorByUsername(req.user.username, function(err, instructor) {
    if(err) {
      throw err;
    }
    res.render('instructors/classes', {instructor: instructor});
  });
});

module.exports = router;
