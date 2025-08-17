import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import StatsCard from '../../components/common/StatsCard';
import DataTable from '../../components/common/DataTable';

const HODDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    averageAttendance: 0
  });

  useEffect(() => {
    // Mock data for now - replace with actual API calls
    setStats({
      totalStudents: 450,
      totalTeachers: 35,
      totalCourses: 25,
      averageAttendance: 85
    });
  }, []);

  const departmentStudents = [
    { id: 1, name: 'John Doe', rollNumber: 'CS001', semester: '6th', attendance: 92, cgpa: 3.8 },
    { id: 2, name: 'Jane Smith', rollNumber: 'CS002', semester: '4th', attendance: 88, cgpa: 3.6 },
    { id: 3, name: 'Bob Johnson', rollNumber: 'CS003', semester: '8th', attendance: 95, cgpa: 3.9 }
  ];

  const departmentTeachers = [
    { id: 1, name: 'Dr. Smith', employeeId: 'T001', qualification: 'PhD', experience: '8 years', courses: 4 },
    { id: 2, name: 'Prof. Johnson', employeeId: 'T002', qualification: 'PhD', experience: '12 years', courses: 5 },
    { id: 3, name: 'Dr. Williams', employeeId: 'T003', qualification: 'PhD', experience: '6 years', courses: 3 }
  ];

  const departmentCourses = [
    { id: 1, name: 'Computer Science Fundamentals', code: 'CS101', instructor: 'Dr. Smith', students: 60, status: 'Active' },
    { id: 2, name: 'Data Structures', code: 'CS201', instructor: 'Prof. Johnson', students: 55, status: 'Active' },
    { id: 3, name: 'Algorithms', code: 'CS301', instructor: 'Dr. Williams', students: 50, status: 'Active' }
  ];

  const reports = [
    { id: 1, title: 'Monthly Attendance Report', type: 'Attendance', date: '2024-01-15', status: 'Generated' },
    { id: 2, title: 'Semester Performance Report', type: 'Performance', date: '2024-01-10', status: 'Generated' },
    { id: 3, title: 'Faculty Evaluation Report', type: 'Evaluation', date: '2024-01-05', status: 'Pending' }
  ];

  return (
    <div className="dashboard-layout">
      <Header variant="dashboard" />
      <div className="dashboard-content">
        <Sidebar />
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1>HOD Dashboard</h1>
            <p>Welcome back, {user?.firstName} {user?.lastName}</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <StatsCard
              title="Total Students"
              value={stats.totalStudents}
              icon="👨‍🎓"
              trend="+15"
              trendType="positive"
            />
            <StatsCard
              title="Total Teachers"
              value={stats.totalTeachers}
              icon="👨‍🏫"
              trend="+2"
              trendType="positive"
            />
            <StatsCard
              title="Total Courses"
              value={stats.totalCourses}
              icon="📚"
              trend="+3"
              trendType="positive"
            />
            <StatsCard
              title="Avg Attendance"
              value={`${stats.averageAttendance}%`}
              icon="✅"
              trend="+2%"
              trendType="positive"
            />
          </div>

          {/* Department Students */}
          <div className="dashboard-section">
            <h2>Department Students</h2>
            <DataTable
              data={departmentStudents}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'rollNumber', label: 'Roll Number' },
                { key: 'semester', label: 'Semester' },
                { key: 'attendance', label: 'Attendance %' },
                { key: 'cgpa', label: 'CGPA' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View student:', row) },
                { label: 'Report', action: (row) => console.log('Generate report:', row) }
              ]}
            />
          </div>

          {/* Department Teachers */}
          <div className="dashboard-section">
            <h2>Department Teachers</h2>
            <DataTable
              data={departmentTeachers}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'employeeId', label: 'Employee ID' },
                { key: 'qualification', label: 'Qualification' },
                { key: 'experience', label: 'Experience' },
                { key: 'courses', label: 'Active Courses' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View teacher:', row) },
                { label: 'Evaluate', action: (row) => console.log('Evaluate teacher:', row) }
              ]}
            />
          </div>

          {/* Department Courses */}
          <div className="dashboard-section">
            <h2>Department Courses</h2>
            <DataTable
              data={departmentCourses}
              columns={[
                { key: 'name', label: 'Course Name' },
                { key: 'code', label: 'Code' },
                { key: 'instructor', label: 'Instructor' },
                { key: 'students', label: 'Students' },
                { key: 'status', label: 'Status' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View course:', row) },
                { label: 'Manage', action: (row) => console.log('Manage course:', row) }
              ]}
            />
          </div>

          {/* Reports */}
          <div className="dashboard-section">
            <h2>Recent Reports</h2>
            <DataTable
              data={reports}
              columns={[
                { key: 'title', label: 'Report Title' },
                { key: 'type', label: 'Type' },
                { key: 'date', label: 'Date' },
                { key: 'status', label: 'Status' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View report:', row) },
                { label: 'Download', action: (row) => console.log('Download report:', row) }
              ]}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HODDashboard;
