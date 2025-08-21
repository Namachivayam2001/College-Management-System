const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  status: { 
    type: String, 
    enum: ['Present', 'Absent', 'Late'], 
    required: true 
  },
  teacherId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Teacher', 
    required: true 
  },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department', 
    required: true 
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  remarks: {
    type: String,
    trim: true
  },
  markedAt: {
    type: Date,
    default: Date.now
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

// Compound index for unique attendance records
AttendanceSchema.index({ 
  studentId: 1, 
  date: 1, 
  subject: 1 
}, { 
  unique: true 
});

// Index for better query performance
AttendanceSchema.index({ date: 1 });
AttendanceSchema.index({ teacherId: 1 });
AttendanceSchema.index({ department: 1 });
AttendanceSchema.index({ subject: 1 });
AttendanceSchema.index({ status: 1 });

module.exports = mongoose.model('Attendance', AttendanceSchema);
