const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const { body } = require('express-validator');
const User = require('../models/User');
const Department = require('../models/Department');
const HOD = require('../models/HOD');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Attendance = require('../models/ExamDuty');
const ExamDuty = require('../models/ExamDuty');

const router = express.Router();

// Apply admin authorization to all routes
router.use(authenticateToken, authorizeRole('Admin'));

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard', async (req, res) => {
  try {
    const stats = await Promise.all([
      User.countDocuments(),
      Department.countDocuments(),
      HOD.countDocuments(),
      Teacher.countDocuments(),
      Student.countDocuments(),
      Attendance.countDocuments(),
      ExamDuty.countDocuments()
    ]);

    res.json({
      success: true,
      data: {
        totalUsers: stats[0],
        totalDepartments: stats[1],
        totalHODs: stats[2],
        totalTeachers: stats[3],
        totalStudents: stats[4],
        totalAttendanceRecords: stats[5],
        totalExamDuties: stats[6]
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with their profiles
// @access  Private (Admin only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .populate('department', 'name code')
      .populate('profile')
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/departments
// @desc    Get all departments with HOD details
// @access  Private (Admin only)
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find()
      .populate('hod', 'employeeId phoneNumber officeLocation')
      .populate({
        path: 'hod',
        populate: {
          path: 'userId',
          select: 'firstName lastName email'
        }
      })
      .sort({ name: 1 });

    res.json({
      success: true,
      data: departments
    });
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/teachers
// @desc    Get all teachers with department details
// @access  Private (Admin only)
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate('userId', 'firstName lastName email isActive')
      .populate('department', 'name code')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: teachers
    });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/students
// @desc    Get all students with department details
// @access  Private (Admin only)
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find()
      .populate('userId', 'firstName lastName email isActive')
      .populate('department', 'name code')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Validation middleware
const userValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  body('role').isIn(['Admin', 'HOD', 'Teacher', 'Student']).withMessage('Invalid role'),
  body('departmentId').optional().isMongoId().withMessage('Invalid department ID')
];

const departmentValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Department name must be at least 2 characters long'),
  body('code').trim().isLength({ min: 2, max: 10 }).withMessage('Department code must be between 2 and 10 characters'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('hodId').optional().isMongoId().withMessage('Invalid HOD ID')
];

// User CRUD operations
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('department', 'name code');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/users', userValidation, handleValidationErrors, async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, departmentId, ...otherData } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userData = {
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      role,
      department: departmentId,
      ...otherData
    };

    const user = await User.create(userData);
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.put('/users/:id', userValidation, handleValidationErrors, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // If password is being updated, hash it
    if (password) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Department CRUD operations
router.get('/departments/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('hod', 'firstName lastName email');

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Get department by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.post('/departments', departmentValidation, handleValidationErrors, async (req, res) => {
  try {
    const { name, code, description, hodId } = req.body;

    // Check if department with same code already exists
    const existingDepartment = await Department.findOne({ code: code.toUpperCase() });
    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: 'Department with this code already exists'
      });
    }

    // Create department
    const departmentData = {
      name,
      code: code.toUpperCase(),
      description,
      hod: hodId
    };

    const department = await Department.create(departmentData);
    const populatedDepartment = await Department.findById(department._id)
      .populate('hod', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: populatedDepartment
    });
  } catch (error) {
    console.error('Create department error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.put('/departments/:id', departmentValidation, handleValidationErrors, async (req, res) => {
  try {
    const { code, ...updateData } = req.body;

    // If code is being updated, check for duplicates
    if (code) {
      const existingDepartment = await Department.findOne({ 
        code: code.toUpperCase(), 
        _id: { $ne: req.params.id } 
      });
      if (existingDepartment) {
        return res.status(400).json({
          success: false,
          message: 'Department with this code already exists'
        });
      }
      updateData.code = code.toUpperCase();
    }

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('hod', 'firstName lastName email');

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.json({
      success: true,
      message: 'Department updated successfully',
      data: department
    });
  } catch (error) {
    console.error('Update department error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.delete('/departments/:id', async (req, res) => {
  try {
    // Check if department has users
    const usersInDepartment = await User.find({ department: req.params.id });
    if (usersInDepartment.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete department with existing users'
      });
    }

    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.json({
      success: true,
      message: 'Department deleted successfully'
    });
  } catch (error) {
    console.error('Delete department error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
