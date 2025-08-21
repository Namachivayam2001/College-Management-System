const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const { body } = require('express-validator');

// Import controllers
const { getAdminDashboard } = require('../controllers/dashboardController');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const { getAllTeachers } = require('../controllers/teacherController');
const { getAllStudents } = require('../controllers/studentController');

const router = express.Router();

// Apply admin authorization to all routes in this file
router.use(authenticateToken, authorizeRole('Admin'));

// Dashboard route (using the dashboard controller)
router.get('/dashboard', getAdminDashboard);

// User CRUD operations
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', /* Add user validation here */ handleValidationErrors, createUser);
router.put('/users/:id', /* Add user validation here */ handleValidationErrors, updateUser);
router.delete('/users/:id', deleteUser);

// Department CRUD operations
router.get('/departments', getAllDepartments);
router.get('/departments/:id', getDepartmentById);
router.post('/departments', /* Add department validation here */ handleValidationErrors, createDepartment);
router.put('/departments/:id', /* Add department validation here */ handleValidationErrors, updateDepartment);
router.delete('/departments/:id', deleteDepartment);

// Teacher and Student lists
router.get('/teachers', getAllTeachers);
router.get('/students', getAllStudents);

module.exports = router;