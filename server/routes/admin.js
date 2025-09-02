const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const { body } = require('express-validator');

// Import controllers
const { getAdminDashboard } = require('../controllers/dashboardController');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher,getTeacherStats } = require('../controllers/teacherController');
const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent, getStudentStats } = require('../controllers/studentController');

const router = express.Router();

// Apply admin authorization to all routes in this file
router.use(authenticateToken, authorizeRole('Admin'));

// Validation middleware
const teacherValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  body('departmentId').isMongoId().withMessage('Invalid department ID'),
  body('employeeId').isLength({ min: 2 }).withMessage('Employee ID is required and must be at least 2 characters'),
  body('qualification').optional().isLength({ min: 2 }).withMessage('Qualification must be at least 2 characters long'),
  body('experience').optional().isNumeric().withMessage('Experience must be a number')
];

const departmentValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Department name must be at least 2 characters long.'),
  body('code').trim().isLength({ min: 2, max: 10 }).withMessage('Department code must be between 2 and 10 characters.'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long.'),
  body('hod').optional().isMongoId().withMessage('Invalid HOD ID.')
];

const userValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  body('role').isIn(['Admin', 'HOD', 'Teacher', 'Student']).withMessage('Invalid role'),
  body('departmentId').optional().isMongoId().withMessage('Invalid department ID')
];

const studentValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name is required and must be at least 2 characters long'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name is required and must be at least 2 characters long'),
  body('departmentId').isMongoId().withMessage('Invalid department ID'),
  body('rollNumber').isLength({ min: 2 }).withMessage('Roll number is required and must be at least 2 characters long'),
  body('studentId').isLength({ min: 2 }).withMessage('Student ID is required and must be at least 2 characters long'),
  body('dateOfBirth').optional().isISO8601().toDate().withMessage('Invalid date format for Date of Birth'),
  body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender value'),
  body('currentSemester').optional().isInt({ min: 1, max: 8 }).withMessage('Current semester must be a number between 1 and 8')
];

// Dashboard and other existing routes
router.get('/dashboard', getAdminDashboard);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', userValidation, handleValidationErrors, createUser);
router.put('/users/:id', userValidation, handleValidationErrors, updateUser);
router.delete('/users/:id', deleteUser);

// Department CRUD operations
router.get('/departments', getAllDepartments);
router.get('/departments/:id', getDepartmentById);
router.post('/departments', departmentValidation, handleValidationErrors, createDepartment);
router.put('/departments/:id', departmentValidation, handleValidationErrors, updateDepartment);
router.delete('/departments/:id', deleteDepartment);

// Teacher CRUD operations
router.get('/teachers', getAllTeachers);
router.get('/teachers/:id', getTeacherById);
router.post('/teachers', teacherValidation, handleValidationErrors, createTeacher);
router.put('/teachers/:id', teacherValidation, handleValidationErrors, updateTeacher);
router.delete('/teachers/:id', deleteTeacher);
router.get('/teachers/stats/:departmentId', getTeacherStats);

// Student CRUD operations
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.post('/students', studentValidation, handleValidationErrors, createStudent);
router.put('/students/:id', studentValidation, handleValidationErrors, updateStudent);
router.delete('/students/:id', deleteStudent);
router.get('/students/stats/:departmentId', getStudentStats);

module.exports = router;