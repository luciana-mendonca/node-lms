var express = require('express');
var router = express.Router();

/* GET users listing. */

// Sign up
router.get('/signup', function(req, res, next) {
  res.render('user/signup', {title: 'Sign Up'});
});

// Sign in
router.get('/signin', function(req, res, next) {
  res.render('user/signin', {title: 'Sign In'});
});

module.exports = router;
