const mongoose = require('mongoose');

const ExamDutySchema = new mongoose.Schema({
  teacherId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Teacher', 
    required: true 
  },
  examName: { 
    type: String, 
    required: true,
    trim: true
  },
  date: { 
    type: Date, 
    required: true 
  },
  timeSlot: { 
    type: String, 
    required: true,
    trim: true
  },
  roomNumber: { 
    type: String, 
    required: true,
    trim: true
  },
  assignedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'HOD' 
  },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department', 
    required: true 
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: 30,
    max: 180
  },
  status: {
    type: String,
    enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  remarks: {
    type: String,
    trim: true
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

// Index for better query performance
ExamDutySchema.index({ teacherId: 1 });
ExamDutySchema.index({ date: 1 });
ExamDutySchema.index({ department: 1 });
ExamDutySchema.index({ status: 1 });
ExamDutySchema.index({ assignedBy: 1 });

module.exports = mongoose.model('ExamDuty', ExamDutySchema);
