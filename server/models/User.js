
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['Admin', 'HOD', 'Teacher', 'Student'], 
    required: true 
  },
  firstName: { 
    type: String, 
    required: true,
    trim: true
  },
  lastName: { 
    type: String, 
    required: true,
    trim: true
  },
  profile: { 
    type: mongoose.Schema.Types.ObjectId, 
    refPath: 'role' 
  }, 
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department', 
    required: function() { 
      return this.role !== 'Admin'; 
    } 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
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

// Remove duplicate index for email (already created by unique: true)
// UserSchema.index({ email: 1 }); // REMOVED
UserSchema.index({ role: 1 });
UserSchema.index({ department: 1 });

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
