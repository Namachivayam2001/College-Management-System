const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private (Admin only)
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('userId', 'firstName lastName email isActive')
      .populate('department', 'name code')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error('Get all students error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get a single student by ID
// @route   GET /api/admin/students/:id
// @access  Private (Admin only)
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', 'firstName lastName email isActive')
      .populate('department', 'name code');

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error('Get student by ID error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a new student and user
// @route   POST /api/admin/students
// @access  Private (Admin only)
const createStudent = async (req, res) => {
  try {
    const { email, password, firstName, lastName, departmentId, ...studentData } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'A user with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'Student',
      department: departmentId
    });

    const newStudent = await Student.create({
      userId: newUser._id,
      department: departmentId,
      ...studentData
    });

    // Update the User's profile field to link to the new Student document
    newUser.profile = newStudent._id;
    await newUser.save();

    res.status(201).json({ success: true, message: 'Student created successfully', data: newStudent });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update a student's details
// @route   PUT /api/admin/students/:id
// @access  Private (Admin only)
const updateStudent = async (req, res) => {
  try {
    const { email, firstName, lastName, ...updateData } = req.body;
    
    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Update the linked User document as well
    const userUpdateData = {};
    if (email) userUpdateData.email = email;
    if (firstName) userUpdateData.firstName = firstName;
    if (lastName) userUpdateData.lastName = lastName;
    
    if (Object.keys(userUpdateData).length > 0) {
      await User.findByIdAndUpdate(student.userId, userUpdateData);
    }
    
    res.status(200).json({ success: true, message: 'Student updated successfully', data: student });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a student and their user record
// @route   DELETE /api/admin/students/:id
// @access  Private (Admin only)
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    await User.findByIdAndDelete(student.userId);

    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get student statistics for a department
// @route   GET /api/admin/students/stats/:departmentId
// @access  Private (Admin only)
const getStudentStats = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;

    const studentCount = await Student.countDocuments({ department: departmentId });

    res.status(200).json({
      success: true,
      data: {
        totalStudentsInDepartment: studentCount
      }
    });
  } catch (error) {
    console.error('Get student stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats
};