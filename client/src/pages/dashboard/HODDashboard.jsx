import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../../store/slices/dashboardSlice';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import StatsCard from '../../components/common/StatsCard';
import DataTable from '../../components/common/DataTable';
import '../../components/common/Dashboard.css';

const HODDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { stats } = useSelector(state => state.dashboard);

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Mock data for HOD dashboard
  const hodStats = {
    totalStudents: 120,
    totalTeachers: 8,
    totalCourses: 15,
    averageAttendance: 85
  };

  const students = [
    { id: 1, name: 'John Doe', rollNumber: 'CS001', semester: 3, attendance: 90, gpa: 3.8 },
    { id: 2, name: 'Jane Smith', rollNumber: 'CS002', semester: 3, attendance: 85, gpa: 3.6 },
    { id: 3, name: 'Mike Johnson', rollNumber: 'CS003', semester: 5, attendance: 92, gpa: 3.9 },
    { id: 4, name: 'Sarah Wilson', rollNumber: 'CS004', semester: 3, attendance: 78, gpa: 3.2 },
    { id: 5, name: 'David Brown', rollNumber: 'CS005', semester: 5, attendance: 88, gpa: 3.7 }
  ];

  const teachers = [
    { id: 1, name: 'Dr. Smith', employeeId: 'T001', courses: 3, students: 45, avgAttendance: 88 },
    { id: 2, name: 'Prof. Johnson', employeeId: 'T002', courses: 2, students: 38, avgAttendance: 85 },
    { id: 3, name: 'Dr. Brown', employeeId: 'T003', courses: 4, students: 52, avgAttendance: 82 },
    { id: 4, name: 'Prof. Davis', employeeId: 'T004', courses: 3, students: 42, avgAttendance: 90 }
  ];

  const courses = [
    { id: 1, name: 'Computer Science Fundamentals', instructor: 'Dr. Smith', students: 45, attendance: 88, avgGrade: 'A-' },
    { id: 2, name: 'Data Structures', instructor: 'Prof. Johnson', students: 42, attendance: 85, avgGrade: 'B+' },
    { id: 3, name: 'Algorithms', instructor: 'Dr. Brown', students: 40, attendance: 82, avgGrade: 'B' },
    { id: 4, name: 'Database Systems', instructor: 'Prof. Davis', students: 38, attendance: 90, avgGrade: 'A' }
  ];

  const reports = [
    { id: 1, title: 'Monthly Attendance Report', type: 'Attendance', date: '2024-01-15', status: 'Completed' },
    { id: 2, title: 'Academic Performance Analysis', type: 'Performance', date: '2024-01-10', status: 'Completed' },
    { id: 3, title: 'Faculty Evaluation Report', type: 'Faculty', date: '2024-01-20', status: 'Pending' },
    { id: 4, title: 'Student Progress Report', type: 'Progress', date: '2024-01-25', status: 'In Progress' }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const studentColumns = [
    { key: 'name', label: 'Student Name' },
    { key: 'rollNumber', label: 'Roll Number' },
    { key: 'semester', label: 'Semester' },
    { key: 'attendance', label: 'Attendance %', render: (value) => `${value}%` },
    { key: 'gpa', label: 'GPA' }
  ];

  const teacherColumns = [
    { key: 'name', label: 'Teacher Name' },
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'courses', label: 'Courses' },
    { key: 'students', label: 'Students' },
    { key: 'avgAttendance', label: 'Avg Attendance %', render: (value) => `${value}%` }
  ];

  const courseColumns = [
    { key: 'name', label: 'Course Name' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'students', label: 'Students' },
    { key: 'attendance', label: 'Attendance %', render: (value) => `${value}%` },
    { key: 'avgGrade', label: 'Average Grade' }
  ];

  const reportColumns = [
    { key: 'title', label: 'Report Title' },
    { key: 'type', label: 'Type' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`status ${value === 'Completed' ? 'completed' : value === 'In Progress' ? 'progress' : 'pending'}`}>
        {value}
      </span>
    )}
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
                  title="Department Students"
                  value={hodStats.totalStudents}
                  icon="👥"
                />
                <StatsCard
                  title="Department Teachers"
                  value={hodStats.totalTeachers}
                  icon="👨‍🏫"
                />
                <StatsCard
                  title="Department Courses"
                  value={hodStats.totalCourses}
                  icon="📚"
                />
                <StatsCard
                  title="Avg Attendance"
                  value={`${hodStats.averageAttendance}%`}
                  icon="📋"
                />
              </div>

              {/* Department Overview */}
              <div className="department-overview">
                <h2>Department Overview</h2>
                <div className="overview-grid">
                  <div className="overview-card">
                    <h3>Student Distribution</h3>
                    <div className="distribution">
                      <div className="dist-item">
                        <span>1st Year:</span>
                        <strong>30</strong>
                      </div>
                      <div className="dist-item">
                        <span>2nd Year:</span>
                        <strong>35</strong>
                      </div>
                      <div className="dist-item">
                        <span>3rd Year:</span>
                        <strong>28</strong>
                      </div>
                      <div className="dist-item">
                        <span>4th Year:</span>
                        <strong>27</strong>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overview-card">
                    <h3>Performance Metrics</h3>
                    <div className="metrics">
                      <div className="metric">
                        <span>Average GPA:</span>
                        <strong>3.6</strong>
                      </div>
                      <div className="metric">
                        <span>Pass Rate:</span>
                        <strong>92%</strong>
                      </div>
                      <div className="metric">
                        <span>Placement Rate:</span>
                        <strong>85%</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Reports */}
              <div className="recent-reports">
                <h2>Recent Reports</h2>
                <div className="reports-grid">
                  {reports.slice(0, 3).map(report => (
                    <div key={report.id} className="report-card">
                      <h3>{report.title}</h3>
                      <p className="report-type">{report.type}</p>
                      <div className="report-details">
                        <span className="date">{report.date}</span>
                        <span className={`status ${report.status === 'Completed' ? 'completed' : report.status === 'In Progress' ? 'progress' : 'pending'}`}>
                          {report.status}
                        </span>
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
                <h2>Department Students</h2>
              </div>
              <DataTable
                data={students}
                columns={studentColumns}
                showActions={false}
                emptyMessage="No students found"
              />
            </div>
          )}

          {activeTab === 'teachers' && (
            <div className="section-content">
              <div className="section-header">
                <h2>Department Teachers</h2>
              </div>
              <DataTable
                data={teachers}
                columns={teacherColumns}
                showActions={false}
                emptyMessage="No teachers found"
              />
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="section-content">
              <div className="section-header">
                <h2>Department Attendance</h2>
              </div>
              
              <div className="attendance-overview">
                <div className="overall-attendance">
                  <h3>Overall Department Attendance</h3>
                  <div className="attendance-circle">
                    <div className="attendance-percentage">{hodStats.averageAttendance}%</div>
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

          {activeTab === 'reports' && (
            <div className="section-content">
              <div className="section-header">
                <h2>Department Reports</h2>
                <button className="add-btn">➕ Generate Report</button>
              </div>
              <DataTable
                data={reports}
                columns={reportColumns}
                showActions={false}
                emptyMessage="No reports found"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HODDashboard;
