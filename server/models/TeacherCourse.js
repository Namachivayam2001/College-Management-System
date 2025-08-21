const mongoose = require('mongoose');

const TeacherCourseSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  academicYear: {
    type: Number,
    required: true,
    min: 2000 // Assuming a starting year
  },
  semester: {
    type: String,
    required: true,
    enum: ['Fall', 'Spring', 'Summer'] // Example semesters
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a compound index to ensure a teacher doesn't teach the same course
// in the same academic year and semester more than once.
TeacherCourseSchema.index({ teacherId: 1, courseId: 1, academicYear: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('TeacherCourse', TeacherCourseSchema);