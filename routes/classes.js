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

module.exports = router;
