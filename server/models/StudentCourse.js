const mongoose = require('mongoose');

const StudentCourseSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Links to the Student model
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Links to the Course model
    required: true
  },
  grade: {
    type: String,
    trim: true // e.g., 'A', 'B+', 'P'
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  // Additional fields for the student's enrollment in this course
  academicYear: {
    type: Number,
    required: true,
    min: 2000 // Example: starting year
  },
  semester: {
    type: String,
    enum: ['Fall', 'Spring', 'Summer'],
    required: true
  }
}, {
  timestamps: true
});

// A compound index ensures a student can't enroll in the same course 
// more than once in the same semester and academic year.
StudentCourseSchema.index({ studentId: 1, courseId: 1, academicYear: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('StudentCourse', StudentCourseSchema);