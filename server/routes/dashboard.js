const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const {
  getAdminDashboard,
  getHODDashboard,
  getTeacherDashboard,
  getStudentDashboard
} = require('../controllers/dashboardController');

const router = express.Router();

// All dashboard routes require authentication
router.use(authenticateToken);

// @route   GET /api/dashboard/admin
// @access  Private (Admin only)
router.get('/admin', authorizeRole('Admin'), getAdminDashboard);

// @route   GET /api/dashboard/hod
// @access  Private (HOD only)
router.get('/hod', authorizeRole('HOD'), getHODDashboard);

// @route   GET /api/dashboard/teacher
// @access  Private (Teacher only)
router.get('/teacher', authorizeRole('Teacher'), getTeacherDashboard);

// @route   GET /api/dashboard/student
// @access  Private (Student only)
router.get('/student', authorizeRole('Student'), getStudentDashboard);

module.exports = router;
