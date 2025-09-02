const express = require('express');
const { body } = require('express-validator');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
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
// @access  Private (Admin only)
router.post('/register', authenticateToken, authorizeRole('Admin'), registerValidation, handleValidationErrors, register); // @route   POST /api/auth/register
router.get('/profile', authenticateToken, getProfile);                                                                     // @route   GET /api/auth/profile
router.put('/profile', authenticateToken, updateProfileValidation, handleValidationErrors, updateProfile);                 // @route   PUT /api/auth/profile


// @access  Public
router.post('/login', loginValidation, handleValidationErrors, login);                             // @route   POST /api/auth/login
router.post('/forgot-password', forgotPasswordValidation, handleValidationErrors, forgotPassword); // @route   POST /api/auth/forgot-password
router.post('/reset-password', resetPasswordValidation, handleValidationErrors, resetPassword);    // @route   POST /api/auth/reset-password

module.exports = router;
