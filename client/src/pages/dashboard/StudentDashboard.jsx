import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../../store/slices/dashboardSlice';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import StatsCard from '../../components/common/StatsCard';
import DataTable from '../../components/common/DataTable';
import '../../components/common/Dashboard.css';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { stats } = useSelector(state => state.dashboard);

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Mock data for student dashboard
  const studentStats = {
    totalCourses: 6,
    totalAssignments: 12,
    completedAssignments: 8,
    attendancePercentage: 85,
    currentGPA: 3.8
  };

  const courses = [
    { id: 1, name: 'Computer Science Fundamentals', instructor: 'Dr. Smith', grade: 'A', attendance: 90 },
    { id: 2, name: 'Data Structures', instructor: 'Prof. Johnson', grade: 'A-', attendance: 85 },
    { id: 3, name: 'Algorithms', instructor: 'Dr. Brown', grade: 'B+', attendance: 80 },
    { id: 4, name: 'Database Systems', instructor: 'Prof. Davis', grade: 'A', attendance: 95 },
    { id: 5, name: 'Software Engineering', instructor: 'Dr. Wilson', grade: 'A-', attendance: 88 },
    { id: 6, name: 'Web Development', instructor: 'Prof. Taylor', grade: 'A', attendance: 92 }
  ];

  const assignments = [
    { id: 1, title: 'Programming Assignment 1', course: 'Computer Science Fundamentals', dueDate: '2024-01-15', status: 'Completed', grade: 'A' },
    { id: 2, title: 'Data Structures Project', course: 'Data Structures', dueDate: '2024-01-20', status: 'Completed', grade: 'A-' },
    { id: 3, title: 'Algorithm Analysis', course: 'Algorithms', dueDate: '2024-01-25', status: 'Pending', grade: '-' },
    { id: 4, title: 'Database Design', course: 'Database Systems', dueDate: '2024-01-30', status: 'Completed', grade: 'A' }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const courseColumns = [
    { key: 'name', label: 'Course Name' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'grade', label: 'Current Grade' },
    { key: 'attendance', label: 'Attendance %', render: (value) => `${value}%` }
  ];

  const assignmentColumns = [
    { key: 'title', label: 'Assignment' },
    { key: 'course', label: 'Course' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`status ${value === 'Completed' ? 'completed' : 'pending'}`}>
        {value}
      </span>
    )},
    { key: 'grade', label: 'Grade' }
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
                  title="My Courses"
                  value={studentStats.totalCourses}
                  icon="📚"
                />
                <StatsCard
                  title="Total Assignments"
                  value={studentStats.totalAssignments}
                  icon="📝"
                />
                <StatsCard
                  title="Attendance"
                  value={`${studentStats.attendancePercentage}%`}
                  icon="📋"
                />
                <StatsCard
                  title="Current GPA"
                  value={studentStats.currentGPA}
                  icon="📊"
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
                        <span className={`status ${assignment.status === 'Completed' ? 'completed' : 'pending'}`}>
                          {assignment.status}
                        </span>
                      </div>
                      {assignment.grade !== '-' && (
                        <div className="grade">Grade: {assignment.grade}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Performance */}
              <div className="course-performance">
                <h2>Course Performance</h2>
                <div className="performance-chart">
                  {courses.map(course => (
                    <div key={course.id} className="course-performance-item">
                      <div className="course-info">
                        <h4>{course.name}</h4>
                        <p>{course.instructor}</p>
                      </div>
                      <div className="performance-stats">
                        <div className="stat">
                          <span>Grade:</span>
                          <strong>{course.grade}</strong>
                        </div>
                        <div className="stat">
                          <span>Attendance:</span>
                          <strong>{course.attendance}%</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="section-content">
              <div className="section-header">
                <h2>My Courses</h2>
              </div>
              <DataTable
                data={courses}
                columns={courseColumns}
                showActions={false}
                emptyMessage="No courses found"
              />
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="section-content">
              <div className="section-header">
                <h2>My Assignments</h2>
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
                <h2>My Attendance</h2>
              </div>
              
              <div className="attendance-overview">
                <div className="overall-attendance">
                  <h3>Overall Attendance</h3>
                  <div className="attendance-circle">
                    <div className="attendance-percentage">{studentStats.attendancePercentage}%</div>
                    <p>Present</p>
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
                <h2>My Grades</h2>
              </div>
              
              <div className="grades-overview">
                <div className="gpa-summary">
                  <h3>GPA Summary</h3>
                  <div className="gpa-card">
                    <div className="gpa-number">{studentStats.currentGPA}</div>
                    <p>Current GPA</p>
                  </div>
                </div>
                
                <div className="course-grades">
                  <h3>Course Grades</h3>
                  <div className="grades-list">
                    {courses.map(course => (
                      <div key={course.id} className="grade-item">
                        <div className="course-info">
                          <h4>{course.name}</h4>
                          <p>{course.instructor}</p>
                        </div>
                        <div className="grade-display">
                          <span className="grade-letter">{course.grade}</span>
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

export default StudentDashboard;
