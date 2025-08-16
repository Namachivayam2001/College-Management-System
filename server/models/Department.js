const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  hod: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'HOD' 
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
DepartmentSchema.index({ name: 1 });
DepartmentSchema.index({ code: 1 });
DepartmentSchema.index({ hod: 1 });

module.exports = mongoose.model('Department', DepartmentSchema);
