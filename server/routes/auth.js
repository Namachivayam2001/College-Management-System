const express = require('express');
const { body } = require('express-validator');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const {
  login,
  register,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

const router = express.Router();

// Validation middleware
const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  body('role').isIn(['Admin', 'HOD', 'Teacher', 'Student']).withMessage('Invalid role'),
  body('departmentId').optional().isMongoId().withMessage('Invalid department ID')
];

const updateProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
  body('lastName').optional().trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  body('currentPassword').optional().isLength({ min: 6 }).withMessage('Current password must be at least 6 characters long'),
  body('newPassword').optional().isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];

const forgotPasswordValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email')
];

const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Token is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Routes
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginValidation, login);

// @route   POST /api/auth/register
// @access  Private (Admin only)
router.post('/register', authenticateToken, authorizeRole('Admin'), registerValidation, register);

// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', authenticateToken, getProfile);

// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', authenticateToken, updateProfileValidation, updateProfile);

// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);

// @route   POST /api/auth/reset-password
// @access  Public
router.post('/reset-password', resetPasswordValidation, resetPassword);

module.exports = router;
