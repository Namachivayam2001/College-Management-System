import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import StatsCard from '../../components/common/StatsCard';
import DataTable from '../../components/common/DataTable';

const TeacherDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalAssignments: 0,
    averageAttendance: 0
  });

  useEffect(() => {
    // Mock data for now - replace with actual API calls
    setStats({
      totalCourses: 4,
      totalStudents: 120,
      totalAssignments: 8,
      averageAttendance: 88
    });
  }, []);

  const courses = [
    { id: 1, name: 'Computer Science Fundamentals', code: 'CS101', students: 30, status: 'Active' },
    { id: 2, name: 'Data Structures', code: 'CS201', students: 25, status: 'Active' },
    { id: 3, name: 'Algorithms', code: 'CS301', students: 35, status: 'Active' }
  ];

  const students = [
    { id: 1, name: 'John Doe', rollNumber: 'CS001', attendance: 95, lastAssignment: 'A-' },
    { id: 2, name: 'Jane Smith', rollNumber: 'CS002', attendance: 88, lastAssignment: 'B+' },
    { id: 3, name: 'Bob Johnson', rollNumber: 'CS003', attendance: 92, lastAssignment: 'A' }
  ];

  const assignments = [
    { id: 1, title: 'Programming Assignment 1', course: 'CS101', dueDate: '2024-01-15', submissions: 28, status: 'Active' },
    { id: 2, title: 'Data Structures Project', course: 'CS201', dueDate: '2024-01-20', submissions: 22, status: 'Active' },
    { id: 3, title: 'Algorithm Analysis', course: 'CS301', dueDate: '2024-01-25', submissions: 0, status: 'Draft' }
  ];

  return (
    <div className="dashboard-layout">
      <Header variant="dashboard" />
      <div className="dashboard-content">
        <Sidebar />
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1>Teacher Dashboard</h1>
            <p>Welcome back, {user?.firstName} {user?.lastName}</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <StatsCard
              title="Total Courses"
              value={stats.totalCourses}
              icon="📚"
              trend="+1"
              trendType="positive"
            />
            <StatsCard
              title="Total Students"
              value={stats.totalStudents}
              icon="👨‍🎓"
              trend="+5"
              trendType="positive"
            />
            <StatsCard
              title="Assignments"
              value={stats.totalAssignments}
              icon="📝"
              trend="+2"
              trendType="positive"
            />
            <StatsCard
              title="Avg Attendance"
              value={`${stats.averageAttendance}%`}
              icon="✅"
              trend="+3%"
              trendType="positive"
            />
          </div>

          {/* My Courses */}
          <div className="dashboard-section">
            <h2>My Courses</h2>
            <DataTable
              data={courses}
              columns={[
                { key: 'name', label: 'Course Name' },
                { key: 'code', label: 'Code' },
                { key: 'students', label: 'Students' },
                { key: 'status', label: 'Status' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View course:', row) },
                { label: 'Manage', action: (row) => console.log('Manage course:', row) }
              ]}
            />
          </div>

          {/* Recent Students */}
          <div className="dashboard-section">
            <h2>Recent Students</h2>
            <DataTable
              data={students}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'rollNumber', label: 'Roll Number' },
                { key: 'attendance', label: 'Attendance %' },
                { key: 'lastAssignment', label: 'Last Assignment' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View student:', row) },
                { label: 'Grade', action: (row) => console.log('Grade student:', row) }
              ]}
            />
          </div>

          {/* Assignments */}
          <div className="dashboard-section">
            <h2>Recent Assignments</h2>
            <DataTable
              data={assignments}
              columns={[
                { key: 'title', label: 'Assignment' },
                { key: 'course', label: 'Course' },
                { key: 'dueDate', label: 'Due Date' },
                { key: 'submissions', label: 'Submissions' },
                { key: 'status', label: 'Status' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View assignment:', row) },
                { label: 'Grade', action: (row) => console.log('Grade assignment:', row) }
              ]}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
