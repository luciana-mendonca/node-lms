var express = require('express');
var router = express.Router();
var Class = require('../models/class');

// All courses
router.get('/', function(req, res, next) {
  Class.getClasses(function(err, classes) {
    if(err) {
      throw err;
    }
    res.render('classes/index', { title: 'All Courses', classes: classes });
  }, 4);
});

// Single course
router.get('/:id/details', function(req, res, next) {
  var id = req.params.id;
  Class.getClassById(id, function(err, classname) {
    if(err) {
      throw err;
    }
    res.render('classes/details', { class: classname });
  });
});

// Lessons
router.get('/:id/lessons', function(req, res, next) {
  var id = req.params.id;
  Class.getClassById(id, function(err, classname) {
    if(err) {
      throw err;
    }
    res.render('classes/lessons', { class: classname });
  });
});

router.get('/:id/lessons/:lesson_id', function(req, res, next) {
  var id = req.params.id;
  Class.getClassById(id, function(err, classname) {
    var lesson;
    if(err) {
      throw err;
    }
    // Get specific lesson that matches the id
    for(var i = 0; i < classname.lessons.length; i++) {
      if(classname.lessons[i].lesson_number == req.params.lesson_id) {
        lesson = classname.lessons[i];
      }
    }
    res.render('classes/lesson', { class: classname, lesson: lesson });
  });
});


module.exports = router;
