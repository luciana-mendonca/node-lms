var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
    bcrypt: true
  },
  type: {  // If it is an instructor or a student
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

// Get a single user by id
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

// Get user by username
module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
};

// Compare passwords
module.exports.comparePassword = function(userPassword, hash, callback) {
  bcrypt.compare(userPassword, hash, function(err, isMatch) {
    if(err) {
      throw err;
    }
    callback(null, isMatch);
  });
}

// Create user type student and hash password with bcrypt
module.exports.saveStudent = function(newUser, newStudent, callback) {
  bcrypt.hash(newUser.password, 10, function(err, hash) {
    if(err) {
      throw err;
    }
    // Hash password
    newUser.password = hash;
    // Save user in two different collections
    async.parallel([newUser.save.bind(newUser), newStudent.save.bind(newStudent)], callback);
  });
}

// Create user type instructor and hash password with bcrypt
module.exports.saveInstructor = function(newUser, newInstructor, callback) {
  bcrypt.hash(newUser.password, 10, function(err, hash) {
    if(err) {
      throw err;
    }
    // Hash password
    newUser.password = hash;
    // Save instructor in two different collections
    async.parallel([newUser.save.bind(newUser), newInstructor.save.bind(newInstructor)], callback);
  });
}
