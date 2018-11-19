var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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
    class_title: {
      type: String
    }
  }]
});

var Student = module.exports = mongoose.model('Student', StudentSchema);
