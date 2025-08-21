const User = require('../models/User');
const Department = require('../models/Department');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const HOD = require('../models/HOD');
const TeacherCourse = require('../models/TeacherCourse');
const StudentCourse = require('../models/StudentCourse');
const Course = require('../models/Course');

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

// @desc    Get data for the teacher's dashboard
// @route   GET /api/teacher/dashboard
// @access  Private (Teacher only)
const getTeacherDashboard = async (req, res) => {
  try {
    const teacherId = req.user.profile;
    const departmentId = req.user.department;

    // 1. Fetch all courses taught by this teacher
    // We use a join with the new TeacherCourse model to find the courses linked to this teacher's ID.
    const teacherCoursesList = await TeacherCourse.find({ teacherId })
      .populate('courseId', 'name code') // Populate the actual Course details
      .populate('teacherId', 'userId') // Optionally populate to ensure link is correct
      .sort({ academicYear: -1, semester: 1 });

    const courses = teacherCoursesList.map(tc => ({
      id: tc.courseId._id,
      name: tc.courseId.name,
      code: tc.courseId.code,
      academicYear: tc.academicYear,
      semester: tc.semester,
      status: 'Active' // Assuming a default status
    }));

    const totalCourses = courses.length;

    // 2. Get student statistics
    // This requires a new StudentCourse model to accurately count students per course.
    // As a placeholder, we'll continue to get all students in the teacher's department.
    const totalStudentsInDepartment = await Student.countDocuments({ department: departmentId });

    // 3. Get a list of the teacher's students
    // This should ideally be a list of students enrolled in the teacher's courses.
    // For now, we fetch a sample of students from the same department.
    const teacherStudents = await Student.find({ department: departmentId })
      .populate('userId', 'firstName lastName email')
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalCourses,
          totalStudents: totalStudentsInDepartment
        },
        teacherCourses: courses,
        teacherStudents
      }
    });
  } catch (error) {
    console.error('Teacher dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get data for the student's dashboard
// @route   GET /api/student/dashboard
// @access  Private (Student only)
const getStudentDashboard = async (req, res) => {
  try {
    // We get the student's profile ID from the authenticated user object.
    const studentProfileId = req.user.profile;

    // 1. Fetch all courses for the student using the StudentCourse junction table.
    const studentCoursesList = await StudentCourse.find({ studentId: studentProfileId })
      .populate('courseId', 'name code credits');

    // 2. Prepare the list of courses with additional details.
    const courses = await Promise.all(studentCoursesList.map(async (sc) => {
      // Find the teacher for each course using the TeacherCourse junction table.
      const teacherCourse = await TeacherCourse.findOne({ courseId: sc.courseId._id }).populate('teacherId');
      
      let instructorName = 'Not assigned';
      if (teacherCourse && teacherCourse.teacherId) {
        // Fetch the user details of the teacher to get their name.
        const teacherUser = await User.findById(teacherCourse.teacherId.userId);
        if (teacherUser) {
          instructorName = `${teacherUser.firstName} ${teacherUser.lastName}`;
        }
      }

      return {
        id: sc.courseId._id,
        name: sc.courseId.name,
        code: sc.courseId.code,
        instructor: instructorName,
        credits: sc.courseId.credits,
        grade: sc.grade || 'N/A' // Use the grade from the StudentCourse model
      };
    }));

    // 3. Calculate dynamic statistics.
    const totalCourses = courses.length;

    // Placeholders for data that requires additional models.
    const totalAssignments = 0; // Requires an Assignment model.
    const attendancePercentage = 0; // Requires an Attendance model.

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalCourses,
          totalAssignments,
          attendancePercentage
        },
        courses
      }
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
