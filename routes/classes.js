var express = require('express');
var router = express.Router();
var Class = require('../models/class');

/* GET home page. */
router.get('/', function(req, res, next) {
  Class.getClasses(function(err, classes) {
    res.render('classes/index', { title: 'All Courses', classes: classes });
  }, 4);
});

module.exports = router;
