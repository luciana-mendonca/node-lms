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

router.post('/classes/register', function(req, res) {
  var info = [];
  info['instructor_username'] = req.user.username;
  info['class_id'] = req.body.class_id;
  info['class_title'] = req.body.class_title;

  Instructor.register(info, function(err, instructor) {
    if(err) {
      throw err;
    }
    console.log(instructor);
  });
  req.flash('success_msg', 'You are now registered as a teacher of this class.');
  res.redirect('/instructors/classes');
});

// Lesson form
router.get('/classes/:id/lessons/new', function(req, res, next) {
  res.render('instructors/newlesson', {title: 'New Lesson', class_id: req.params.id});
});

// Create new lesson
router.post('/classes/:id/lessons/new', function(req, res, next) {
  var info = [];
  info['class_id'] = req.params.id;
  info['lesson_number'] = req.body.lesson_number;
  info['lesson_title'] = req.body.lesson_title;
  info['lesson_body'] = req.body.lesson_body;

  Class.addLesson(info, function(err, lesson) {
    if(err) {
      throw err;
    }
  });
  req.flash('success_msg', 'Lesson added.');
  res.redirect('/instructors/classes');
});

// Edit lesson form
router.get('/classes/:id/lesson/:lesson_number/edit', function(req, res, next) {
  var lesson_number = req.params.lesson_number;
  var id = req.params.id;

  Class.getClassById(id, function(err, classname) {
    var lesson;
    if(err) {
      throw err;
    }
    // Get specific lesson that matches the id
    for(var i = 0; i < classname.lessons.length; i++) {
      if(classname.lessons[i].lesson_number == lesson_number) {
        lesson = classname.lessons[i];
      }
    }
    console.log(lesson._id);
    res.render('instructors/editlesson', {title: 'Edit Lesson', lesson_number: lesson.lesson_number, lesson_title: lesson.lesson_title, lesson_body: lesson.lesson_body, class_id: id});
  });
});

router.post('/classes/:id/lesson/:lesson_number/edit', function(req, res, next) {
  var lesson_number = req.params.lesson_number;
  var id = req.params.id;
  var info = [];

  Instructor.getInstructorByUsername(req.user.username, function(err, instructor) {
    if(err) {
      throw err;
    }

    info['class_id'] = req.params.id;
    info['lesson_number'] = req.params.lesson_number;
    info['lesson_title'] = req.body.update_lesson_title;
    info['lesson_body'] = req.body.update_lesson_body;

    Class.updateLesson(info, function(err, lesson) {
      if(err) {
        throw err;
      }
      req.flash('success_msg', 'Lesson updated.');
      res.redirect('/classes/' + class_id + '/lessons');
    });
  });
});

// Delete lesson
router.get('/classes/:id/lesson/:lesson_number/delete', function(req, res, next) {
  var lesson_number = req.params.lesson_number;
  var info = [];

  info['class_id'] = req.params.id;
  info['lesson_number'] = req.params.lesson_number;

  Class.deleteLesson(info, function(err) {
    if(err) {
      throw err;
    }
    req.flash('success_msg', 'Lesson deleted.');
    res.redirect('back');
  });
});

module.exports = router;
