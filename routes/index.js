var express = require('express');
var router = express.Router();
var Class = require('../models/class');

/* GET home page. */
router.get('/', function(req, res, next) {
  Class.getClasses(function(err, classes) {
    res.render('index', { title: 'Code Studio', classes: classes });
  }, 4);
});

module.exports = router;
