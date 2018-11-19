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
