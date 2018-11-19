var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  type: {  // If it is an instructor or a student
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

// Get a single user by id
module.exports.getUserById = function(id, cb) {
  User.findById(id, cb);
};

// Get user by username
module.exports.getUserByUsername = function(username, cb) {
  var query = {username: username};
  User.findOne(query, cb);
};

// Compare passwords
module.exports.comparePassword = function(userPassword, hash, cb) {
  bcrypt.compare(userPassword, hash, function(err, isMatch) {
    if(err) {
      throw err;
    }
    cb(null, isMatch);
  });
}

// Create user type student and hash password with bcrypt
module.exports.saveStudent = function(newUser, newStudent, cb) {
  bcrypt.hash(newUser.password, 10, function(err, hash) {
    if(err) {
      throw err;
    }
    // Hash password
    newUser.password = hash;
    // Save user in two different collections
    async.parallel([newUser.save, newStudent.save], cb);
  });
}

// Create user type instructor and hash password with bcrypt
module.exports.saveStudent = function(newUser, newInstructor, cb) {
  bcrypt.hash(newUser.password, 10, function(err, hash) {
    if(err) {
      throw err;
    }
    // Hash password
    newUser.password = hash;
    // Save user in two different collections
    async.parallel([newUser.save, newInstructor.save], cb);
  });
}
