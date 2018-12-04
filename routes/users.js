var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Student = require('../models/student');
var Instructor = require('../models/instructor');

/* GET users listing. */

// Sign up
router.get('/signup', function(req, res, next) {
  res.render('user/signup', {title: 'Sign Up'});
});

router.post('/signup', function(req, res, next) {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var type = req.body.type;

  // Validation with Express Validator
  req.checkBody('first_name', 'First name required.').notEmpty();
  req.checkBody('last_name', 'Last name required.').notEmpty();
  req.checkBody('email', 'Email required.').notEmpty();
  req.checkBody('email', 'It must be a valid email address.').isEmail();
  req.checkBody('username', 'Username required.').notEmpty();
  req.checkBody('password', 'Password field is required.').notEmpty();
  req.checkBody('password2', 'Passwords do not match.').equals(req.body.password);

  errors = req.validationErrors();

  if(errors) {
    res.render('user/signup', {
      errors: errors
    });
  } else {
    // Create a user
    var newUser = new User({
      email: email,
      username: username,
      password: password,
      type: type
    });

    // Check type instructor or student, create users
    if(type == 'student') {
      console.log('Registering as student...');
      var newStudent = new Student({
        first_name: first_name,
        last_name: last_name,
        email: email,
        username: username
      });
      console.log(newUser);
      // Save student in the user collection
      User.saveStudent(newUser, newStudent, function(err, user) {
        console.log('Student created!');
      });
    } else {
      console.log('Registering as instructor...');
      var newInstructor = new Instructor({
        first_name: first_name,
        last_name: last_name,
        email: email,
        username: username
      });

      // Save instructor in the user collection
      User.saveInstructor(newUser, newInstructor, function(err, user) {
        console.log('Instructor created!');
      });
    }
    // Flash message
    req.flash('success_msg', 'User added');
    res.render('user/signin');
  }
});


// Sign in

// Serialize user for the session to determine which data will be saved
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

// Deserialize user
passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/signin', function(req, res, next) {
  res.render('user/signin', {title: 'Sign In'});
});

router.post('/signin', passport.authenticate('local', {failureRedirect: '/users/signin', failureFlash: true}), function(req, res, next) {
  req.flash('success_msg', 'Logged in.');
  var usertype = req.user.type;
  res.redirect('/');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if(err) {
        throw err;
      }
      if(!user) {
        return done(null, false, { message: 'User'+ ' ' + username + ' '+ 'is not registered.' });
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if(err) {
          return done(err);
        }
        if(isMatch) {
          return done(null, user);
        } else {
          console.log('wrong password');
          return done(null, false, { message: 'Invalid password.' });
        }
      });
    });
  }
));

// Logout
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', "Logged out");
  	res.redirect('/');
});

module.exports = router;
