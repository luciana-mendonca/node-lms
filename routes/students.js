var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Student = require('../models/student');
var Class = require('../models/class');

// Student classes
router.get('/classes', isLoggedIn, function(req, res, next) {
  Student.getStudentByUsername(req.user.username, function(err, student) {
    if(err) {
      throw err;
    }
    res.render('students/classes', {student: student});
  });
});

router.post('/classes/register', isLoggedIn, function(req, res) {
  var info = [];
  info['student_username'] = req.user.username;
  info['class_id'] = req.body.class_id;
  info['class_title'] = req.body.class_title;

  Student.register(info, function(err, student) {
    if(err) {
      throw err;
    }
    console.log(student);
  });
  req.flash('success_msg', 'You are now enrroled in this class.');
  res.redirect('/students/classes');
});

// Access Control
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash('You must login to access this page.');
    res.redirect('/users/signin');
  }
};
module.exports = router;
