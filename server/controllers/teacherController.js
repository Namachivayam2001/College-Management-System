const Teacher = require('../models/Teacher');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Private (Admin only)
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate('userId', 'firstName lastName email isActive')
      .populate('department', 'name code')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    console.error('Get all teachers error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get a single teacher by ID
// @route   GET /api/admin/teachers/:id
// @access  Private (Admin only)
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('userId', 'firstName lastName email isActive')
      .populate('department', 'name code');

    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    console.error('Get teacher by ID error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a new teacher and user
// @route   POST /api/admin/teachers
// @access  Private (Admin only)
const createTeacher = async (req, res) => {
  try {
    const { email, password, firstName, lastName, departmentId, ...teacherData } = req.body;

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
      role: 'Teacher',
      department: departmentId
    });

    const newTeacher = await Teacher.create({
      userId: newUser._id,
      department: departmentId,
      ...teacherData
    });

    // Update the User's profile field to link to the new Teacher document
    newUser.profile = newTeacher._id;
    await newUser.save();

    res.status(201).json({ success: true, message: 'Teacher created successfully', data: newTeacher });
  } catch (error) {
    console.error('Create teacher error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update a teacher's details
// @route   PUT /api/admin/teachers/:id
// @access  Private (Admin only)
const updateTeacher = async (req, res) => {
  try {
    const { email, firstName, lastName, ...updateData } = req.body;
    
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    // Update the linked User document as well
    const userUpdateData = {};
    if (email) userUpdateData.email = email;
    if (firstName) userUpdateData.firstName = firstName;
    if (lastName) userUpdateData.lastName = lastName;
    
    if (Object.keys(userUpdateData).length > 0) {
      await User.findByIdAndUpdate(teacher.userId, userUpdateData);
    }
    
    res.status(200).json({ success: true, message: 'Teacher updated successfully', data: teacher });
  } catch (error) {
    console.error('Update teacher error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a teacher and their user record
// @route   DELETE /api/admin/teachers/:id
// @access  Private (Admin only)
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    await User.findByIdAndDelete(teacher.userId);

    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Delete teacher error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get teacher statistics for a department
// @route   GET /api/admin/teachers/stats/:departmentId
// @access  Private (Admin only)
const getTeacherStats = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;

    const teacherCount = await Teacher.countDocuments({ department: departmentId });

    res.status(200).json({
      success: true,
      data: {
        totalTeachersInDepartment: teacherCount
      }
    });
  } catch (error) {
    console.error('Get teacher stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherStats
};