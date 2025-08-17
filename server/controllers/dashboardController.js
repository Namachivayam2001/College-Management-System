const User = require('../models/User');
const Department = require('../models/Department');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const HOD = require('../models/HOD');

// @desc    Get admin dashboard data
// @route   GET /api/dashboard/admin
// @access  Private (Admin)
const getAdminDashboard = async (req, res) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalStudents = await Student.countDocuments();

    // Get recent users
    const recentUsers = await User.find()
      .select('-password')
      .populate('department', 'name code')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get recent departments
    const recentDepartments = await Department.find()
      .populate('hod', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalDepartments,
          totalTeachers,
          totalStudents
        },
        recentUsers,
        recentDepartments
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get HOD dashboard data
// @route   GET /api/dashboard/hod
// @access  Private (HOD)
const getHODDashboard = async (req, res) => {
  try {
    const departmentId = req.user.department;

    // Get department students
    const departmentStudents = await Student.find({ department: departmentId })
      .populate('userId', 'firstName lastName email')
      .populate('department', 'name code')
      .limit(10);

    // Get department teachers
    const departmentTeachers = await Teacher.find({ department: departmentId })
      .populate('userId', 'firstName lastName email')
      .populate('department', 'name code')
      .limit(10);

    // Get counts
    const totalStudents = await Student.countDocuments({ department: departmentId });
    const totalTeachers = await Teacher.countDocuments({ department: departmentId });

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalStudents,
          totalTeachers
        },
        departmentStudents,
        departmentTeachers
      }
    });
  } catch (error) {
    console.error('HOD dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get teacher dashboard data
// @route   GET /api/dashboard/teacher
// @access  Private (Teacher)
const getTeacherDashboard = async (req, res) => {
  try {
    const teacherId = req.user._id;

    // Mock data for now - replace with actual course/assignment data
    const mockData = {
      stats: {
        totalCourses: 4,
        totalStudents: 120,
        totalAssignments: 8,
        averageAttendance: 88
      },
      courses: [
        { id: 1, name: 'Computer Science Fundamentals', code: 'CS101', students: 30, status: 'Active' },
        { id: 2, name: 'Data Structures', code: 'CS201', students: 25, status: 'Active' },
        { id: 3, name: 'Algorithms', code: 'CS301', students: 35, status: 'Active' }
      ],
      students: [
        { id: 1, name: 'John Doe', rollNumber: 'CS001', attendance: 95, lastAssignment: 'A-' },
        { id: 2, name: 'Jane Smith', rollNumber: 'CS002', attendance: 88, lastAssignment: 'B+' },
        { id: 3, name: 'Bob Johnson', rollNumber: 'CS003', attendance: 92, lastAssignment: 'A' }
      ]
    };

    res.status(200).json({
      success: true,
      data: mockData
    });
  } catch (error) {
    console.error('Teacher dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get student dashboard data
// @route   GET /api/dashboard/student
// @access  Private (Student)
const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user._id;

    // Mock data for now - replace with actual course/assignment data
    const mockData = {
      stats: {
        totalCourses: 6,
        totalAssignments: 12,
        averageGrade: 85,
        attendancePercentage: 92
      },
      courses: [
        { id: 1, name: 'Computer Science Fundamentals', code: 'CS101', instructor: 'Dr. Smith', credits: 3, grade: 'A-' },
        { id: 2, name: 'Data Structures', code: 'CS201', instructor: 'Prof. Johnson', credits: 4, grade: 'B+' },
        { id: 3, name: 'Algorithms', code: 'CS301', instructor: 'Dr. Williams', credits: 4, grade: 'A' }
      ],
      assignments: [
        { id: 1, title: 'Programming Assignment 1', course: 'CS101', dueDate: '2024-01-15', status: 'Submitted', grade: 'A-' },
        { id: 2, title: 'Data Structures Project', course: 'CS201', dueDate: '2024-01-20', status: 'Submitted', grade: 'B+' },
        { id: 3, title: 'Algorithm Analysis', course: 'CS301', dueDate: '2024-01-25', status: 'Pending', grade: '-' }
      ]
    };

    res.status(200).json({
      success: true,
      data: mockData
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAdminDashboard,
  getHODDashboard,
  getTeacherDashboard,
  getStudentDashboard
};
