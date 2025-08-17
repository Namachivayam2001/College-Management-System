import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import StatsCard from '../../components/common/StatsCard';
import DataTable from '../../components/common/DataTable';

const StudentDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalAssignments: 0,
    averageGrade: 0,
    attendancePercentage: 0
  });

  useEffect(() => {
    // Mock data for now - replace with actual API calls
    setStats({
      totalCourses: 6,
      totalAssignments: 12,
      averageGrade: 85,
      attendancePercentage: 92
    });
  }, []);

  const courses = [
    { id: 1, name: 'Computer Science Fundamentals', code: 'CS101', instructor: 'Dr. Smith', credits: 3, grade: 'A-' },
    { id: 2, name: 'Data Structures', code: 'CS201', instructor: 'Prof. Johnson', credits: 4, grade: 'B+' },
    { id: 3, name: 'Algorithms', code: 'CS301', instructor: 'Dr. Williams', credits: 4, grade: 'A' }
  ];

  const assignments = [
    { id: 1, title: 'Programming Assignment 1', course: 'CS101', dueDate: '2024-01-15', status: 'Submitted', grade: 'A-' },
    { id: 2, title: 'Data Structures Project', course: 'CS201', dueDate: '2024-01-20', status: 'Submitted', grade: 'B+' },
    { id: 3, title: 'Algorithm Analysis', course: 'CS301', dueDate: '2024-01-25', status: 'Pending', grade: '-' }
  ];

  return (
    <div className="dashboard-layout">
      <Header variant="dashboard" />
      <div className="dashboard-content">
        <Sidebar />
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1>Student Dashboard</h1>
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
              title="Assignments"
              value={stats.totalAssignments}
              icon="📝"
              trend="+3"
              trendType="positive"
            />
            <StatsCard
              title="Average Grade"
              value={`${stats.averageGrade}%`}
              icon="📊"
              trend="+2%"
              trendType="positive"
            />
            <StatsCard
              title="Attendance"
              value={`${stats.attendancePercentage}%`}
              icon="✅"
              trend="+1%"
              trendType="positive"
            />
          </div>

          {/* Current Courses */}
          <div className="dashboard-section">
            <h2>Current Courses</h2>
            <DataTable
              data={courses}
              columns={[
                { key: 'name', label: 'Course Name' },
                { key: 'code', label: 'Code' },
                { key: 'instructor', label: 'Instructor' },
                { key: 'credits', label: 'Credits' },
                { key: 'grade', label: 'Grade' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View course:', row) }
              ]}
            />
          </div>

          {/* Recent Assignments */}
          <div className="dashboard-section">
            <h2>Recent Assignments</h2>
            <DataTable
              data={assignments}
              columns={[
                { key: 'title', label: 'Assignment' },
                { key: 'course', label: 'Course' },
                { key: 'dueDate', label: 'Due Date' },
                { key: 'status', label: 'Status' },
                { key: 'grade', label: 'Grade' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View assignment:', row) },
                { label: 'Submit', action: (row) => console.log('Submit assignment:', row) }
              ]}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
