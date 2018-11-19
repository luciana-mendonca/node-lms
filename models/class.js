var mongoose = require('mongoose');

// Class schema

var ClassSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  instructor: {
    type: String
  },
  lessons: [{
    lesson_number: {type: Number},
    lesson_title: {type: String},
    lesson_body: {type: String}
  }]
});

var Class = module.exports = mongoose.model('Class', ClassSchema);

// Fetch all classes
module.exports.getClasses = function(callback, limit) {
  Class.find(callback).limit(limit);
};

// Fetch a single class
module.exports.getClassById = function (id, callback) {
  Class.findById(id, callback);
};
