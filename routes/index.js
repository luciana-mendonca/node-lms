var express = require('express');
var router = express.Router();
var Class = require('../models/class');

/* GET home page. */
router.get('/', function(req, res, next) {
  Class.getClasses(function(err, classes) {
    res.render('index', { title: 'E-Learning', classes: classes });
  }, 4);
});

module.exports = router;
