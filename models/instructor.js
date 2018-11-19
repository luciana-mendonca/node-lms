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
    class_title: {
      type: String
    }
  }]
});

var Instructor = module.exports = mongoose.model('Instructor', InstructorSchema);
