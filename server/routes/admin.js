const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const User = require('../models/User');
const Department = require('../models/Department');
const HOD = require('../models/HOD');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
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

module.exports = router;
