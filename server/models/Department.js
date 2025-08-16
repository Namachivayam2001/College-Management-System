
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

// Remove duplicate indexes (already created by unique: true)
// DepartmentSchema.index({ name: 1 }); // REMOVED
// DepartmentSchema.index({ code: 1 }); // REMOVED
DepartmentSchema.index({ hod: 1 });

module.exports = mongoose.model('Department', DepartmentSchema);
