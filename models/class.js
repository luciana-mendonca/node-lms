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
  img_url: {
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

// Create a lesson
module.exports.addLesson = function (info, callback) {
  class_id = info['class_id'];
  lesson_number = info['lesson_number'];
  lesson_title = info['lesson_title'];
  lesson_body = info['lesson_body'];

  Class.findByIdAndUpdate(
    class_id,
    {$push: {"lessons": {lesson_number: lesson_number, lesson_title: lesson_title, lesson_body: lesson_body}}},
    {safe: true, upsert: true},
    callback
  );
};

// Update Lesson
module.exports.updateLesson = function (info, callback) {
  class_id = info['class_id'];
  lesson_number = info['lesson_number'];
  lesson_title = info['lesson_title'];
  lesson_body = info['lesson_body'];

  Class.findById(class_id, function (err, classname) {
    if (err) {
      throw err;
    }

    var lessons = classname.lessons;
    var lesson;

    for(var i = 0; i < lessons.length; i++) {
      if(lessons[i].lesson_number == lesson_number) {
        lesson = lessons[i];
        lesson.lesson_number = lesson_number;
        lesson.lesson_title = lesson_title;
        lesson.lesson_body = lesson_body;
      }
    }

    Class.findByIdAndUpdate(
      class_id,
      {$set: {"lessons": lessons}},
      {safe: true},
      callback
    );
  });
};
// Delete Lesson
module.exports.deleteLesson = function (info, callback) {
  class_id = info['class_id'];
  lesson_number = info['lesson_number'];

  Class.findByIdAndUpdate(
    class_id,
    {$pull: {"lessons": {lesson_number: lesson_number}}},
    {safe: true},
    callback
  );
};
