const Department = require('../models/Department');
const User = require('../models/User');

// @desc    Get all departments
// @route   GET /api/admin/departments
// @access  Private (Admin only)
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate('hod', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: departments
    });
  } catch (error) {
    console.error('Get all departments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get department by ID
// @route   GET /api/admin/departments/:id
// @access  Private (Admin only)
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('hod', 'firstName lastName email');

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.status(200).json({
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
};

// @desc    Create new department
// @route   POST /api/admin/departments
// @access  Private (Admin only)
const createDepartment = async (req, res) => {
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
};

// @desc    Update department
// @route   PUT /api/admin/departments/:id
// @access  Private (Admin only)
const updateDepartment = async (req, res) => {
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

    res.status(200).json({
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
};

// @desc    Delete department
// @route   DELETE /api/admin/departments/:id
// @access  Private (Admin only)
const deleteDepartment = async (req, res) => {
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

    res.status(200).json({
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
};

// @desc    Get department statistics
// @route   GET /api/admin/departments/:id/stats
// @access  Private (Admin only)
const getDepartmentStats = async (req, res) => {
  try {
    const departmentId = req.params.id;

    // Count users by role in this department
    const stats = await User.aggregate([
      { $match: { department: departmentId } },
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const formattedStats = {};
    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.status(200).json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    console.error('Get department stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentStats
};

