import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../../store/slices/dashboardSlice';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import StatsCard from '../../components/common/StatsCard';
import DataTable from '../../components/common/DataTable';
import '../../components/common/Dashboard.css';

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { stats } = useSelector(state => state.dashboard);

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Mock data for teacher dashboard
  const teacherStats = {
    totalStudents: 45,
    totalCourses: 3,
    totalAssignments: 8,
    averageAttendance: 88
  };

  const students = [
    { id: 1, name: 'John Doe', rollNumber: 'CS001', attendance: 90, grade: 'A' },
    { id: 2, name: 'Jane Smith', rollNumber: 'CS002', attendance: 85, grade: 'A-' },
    { id: 3, name: 'Mike Johnson', rollNumber: 'CS003', attendance: 92, grade: 'A' },
    { id: 4, name: 'Sarah Wilson', rollNumber: 'CS004', attendance: 78, grade: 'B+' },
    { id: 5, name: 'David Brown', rollNumber: 'CS005', attendance: 88, grade: 'A-' }
  ];

  const assignments = [
    { id: 1, title: 'Programming Assignment 1', course: 'Computer Science Fundamentals', dueDate: '2024-01-15', submissions: 42, totalStudents: 45 },
    { id: 2, title: 'Data Structures Project', course: 'Data Structures', dueDate: '2024-01-20', submissions: 38, totalStudents: 45 },
    { id: 3, title: 'Algorithm Analysis', course: 'Algorithms', dueDate: '2024-01-25', submissions: 0, totalStudents: 45 },
    { id: 4, title: 'Database Design', course: 'Database Systems', dueDate: '2024-01-30', submissions: 0, totalStudents: 45 }
  ];

  const courses = [
    { id: 1, name: 'Computer Science Fundamentals', students: 45, attendance: 88, avgGrade: 'A-' },
    { id: 2, name: 'Data Structures', students: 42, attendance: 85, avgGrade: 'B+' },
    { id: 3, name: 'Algorithms', students: 40, attendance: 82, avgGrade: 'B' }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const studentColumns = [
    { key: 'name', label: 'Student Name' },
    { key: 'rollNumber', label: 'Roll Number' },
    { key: 'attendance', label: 'Attendance %', render: (value) => `${value}%` },
    { key: 'grade', label: 'Current Grade' }
  ];

  const assignmentColumns = [
    { key: 'title', label: 'Assignment' },
    { key: 'course', label: 'Course' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'submissions', label: 'Submissions', render: (value, item) => `${value}/${item.totalStudents}` },
    { key: 'status', label: 'Status', render: (value, item) => (
      <span className={`status ${value === item.totalStudents ? 'completed' : value > 0 ? 'partial' : 'pending'}`}>
        {value === item.totalStudents ? 'All Submitted' : value > 0 ? 'Partial' : 'No Submissions'}
      </span>
    )}
  ];

  const courseColumns = [
    { key: 'name', label: 'Course Name' },
    { key: 'students', label: 'Students' },
    { key: 'attendance', label: 'Avg Attendance %', render: (value) => `${value}%` },
    { key: 'avgGrade', label: 'Average Grade' }
  ];

  return (
    <div className="dashboard-layout">
      <Header variant="dashboard" />
      
      <div className="dashboard-container">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main className="main-content">
          <div className="breadcrumb">
            Home &gt; {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </div>

          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              {/* Summary Cards */}
              <div className="stats-grid">
                <StatsCard
                  title="My Students"
                  value={teacherStats.totalStudents}
                  icon="👥"
                />
                <StatsCard
                  title="My Courses"
                  value={teacherStats.totalCourses}
                  icon="📚"
                />
                <StatsCard
                  title="Active Assignments"
                  value={teacherStats.totalAssignments}
                  icon="📝"
                />
                <StatsCard
                  title="Avg Attendance"
                  value={`${teacherStats.averageAttendance}%`}
                  icon="📋"
                />
              </div>

              {/* Recent Assignments */}
              <div className="recent-assignments">
                <h2>Recent Assignments</h2>
                <div className="assignments-grid">
                  {assignments.slice(0, 3).map(assignment => (
                    <div key={assignment.id} className="assignment-card">
                      <h3>{assignment.title}</h3>
                      <p className="course-name">{assignment.course}</p>
                      <div className="assignment-details">
                        <span className="due-date">Due: {assignment.dueDate}</span>
                        <span className="submissions">
                          {assignment.submissions}/{assignment.totalStudents} submitted
                        </span>
                      </div>
                      <div className="submission-rate">
                        Submission Rate: {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Overview */}
              <div className="course-overview">
                <h2>Course Overview</h2>
                <div className="courses-grid">
                  {courses.map(course => (
                    <div key={course.id} className="course-card">
                      <h3>{course.name}</h3>
                      <div className="course-stats">
                        <div className="stat">
                          <span>Students:</span>
                          <strong>{course.students}</strong>
                        </div>
                        <div className="stat">
                          <span>Attendance:</span>
                          <strong>{course.attendance}%</strong>
                        </div>
                        <div className="stat">
                          <span>Avg Grade:</span>
                          <strong>{course.avgGrade}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="section-content">
              <div className="section-header">
                <h2>My Students</h2>
              </div>
              <DataTable
                data={students}
                columns={studentColumns}
                showActions={false}
                emptyMessage="No students found"
              />
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="section-content">
              <div className="section-header">
                <h2>My Assignments</h2>
                <button className="add-btn">➕ Create Assignment</button>
              </div>
              <DataTable
                data={assignments}
                columns={assignmentColumns}
                showActions={false}
                emptyMessage="No assignments found"
              />
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="section-content">
              <div className="section-header">
                <h2>Attendance Management</h2>
              </div>
              
              <div className="attendance-overview">
                <div className="overall-attendance">
                  <h3>Overall Attendance</h3>
                  <div className="attendance-circle">
                    <div className="attendance-percentage">{teacherStats.averageAttendance}%</div>
                    <p>Average</p>
                  </div>
                </div>
                
                <div className="course-attendance">
                  <h3>Course-wise Attendance</h3>
                  <div className="course-attendance-list">
                    {courses.map(course => (
                      <div key={course.id} className="course-attendance-item">
                        <div className="course-name">{course.name}</div>
                        <div className="attendance-bar">
                          <div 
                            className="attendance-fill" 
                            style={{width: `${course.attendance}%`}}
                          ></div>
                          <span className="attendance-text">{course.attendance}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="section-content">
              <div className="section-header">
                <h2>Grade Management</h2>
              </div>
              
              <div className="grades-overview">
                <div className="grade-summary">
                  <h3>Grade Summary</h3>
                  <div className="grade-stats">
                    <div className="grade-stat">
                      <span>Average Grade:</span>
                      <strong>B+</strong>
                    </div>
                    <div className="grade-stat">
                      <span>Students with A:</span>
                      <strong>15</strong>
                    </div>
                    <div className="grade-stat">
                      <span>Students with B:</span>
                      <strong>20</strong>
                    </div>
                    <div className="grade-stat">
                      <span>Students with C:</span>
                      <strong>10</strong>
                    </div>
                  </div>
                </div>
                
                <div className="course-grades">
                  <h3>Course Grades</h3>
                  <div className="grades-list">
                    {courses.map(course => (
                      <div key={course.id} className="grade-item">
                        <div className="course-info">
                          <h4>{course.name}</h4>
                          <p>{course.students} students</p>
                        </div>
                        <div className="grade-display">
                          <span className="grade-letter">{course.avgGrade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
