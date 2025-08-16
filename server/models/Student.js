const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
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
  rollNumber: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  guardianName: {
    type: String,
    trim: true
  },
  guardianPhone: {
    type: String,
    trim: true
  },
  guardianEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  currentSemester: {
    type: Number,
    min: 1,
    max: 8,
    default: 1
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
StudentSchema.index({ userId: 1 });
StudentSchema.index({ department: 1 });
StudentSchema.index({ rollNumber: 1 });
StudentSchema.index({ studentId: 1 });
StudentSchema.index({ currentSemester: 1 });

module.exports = mongoose.model('Student', StudentSchema);
