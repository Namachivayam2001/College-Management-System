const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department', 
    required: true 
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  officeLocation: {
    type: String,
    trim: true
  },
  qualification: {
    type: String,
    trim: true
  },
  experience: {
    type: Number, // years of experience
    min: 0
  },
  subjects: [{
    type: String,
    trim: true
  }],
  specialization: {
    type: String,
    trim: true
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

// Index for better query performance
TeacherSchema.index({ userId: 1 });
TeacherSchema.index({ department: 1 });
TeacherSchema.index({ employeeId: 1 });
TeacherSchema.index({ subjects: 1 });

module.exports = mongoose.model('Teacher', TeacherSchema);
