var mongoose = require('mongoose');

var InstructorSchema = mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  classes: [{
    class_id: {type: [mongoose.Schema.Types.ObjectId]},
    class_title: {type: String}
  }]
});

var Instructor = module.exports = mongoose.model('Instructor', InstructorSchema);

// Get instructor by username
module.exports.getInstructorByUsername = function(username, callback) {
  var query = {username: username};
  Instructor.findOne(query, callback);
};

// Register an instructor for a class
module.exports.register = function(info, callback) {
  instructor_username = info['instructor_username'];
  class_id = info['class_id'];
  class_title = info['class_title'];

  var query = {username: instructor_username};
  Instructor.findOneAndUpdate(
    query,
    // Append the values to an array - push classes inside the instructor collection
    {$push: {"classes": {class_id: class_id, class_title: class_title}}},
    // Creates a new document if no documents match the filter or update
    {safe: true, upsert: true},
    callback
  );
}
