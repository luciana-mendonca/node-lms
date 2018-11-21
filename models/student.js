var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({
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
    class_id: {type: [mongoose.Schema.Types.ObjectId]}, //Map through ObjectId
    class_title: {type: String}
  }]
});

var Student = module.exports = mongoose.model('Student', StudentSchema);

// Get student by username
module.exports.getStudentByUsername = function(username, callback) {
  var query = {username: username};
  Student.findOne(query, callback);
};

// Register a student for a class
module.exports.register = function(info, callback) {
  student_username = info['student_username'];
  class_id = info['class_id'];
  class_title = info['class_title'];

  var query = {username: student_username};
  Student.findOneAndUpdate(
    query,
    // Append the values to an array - push classes inside the instructor collection
    {$push: {"classes": {class_id: class_id, class_title: class_title}}},
    // Creates a new document if no documents match the filter or update
    {safe: true, upsert: true},
    callback
  );
}
