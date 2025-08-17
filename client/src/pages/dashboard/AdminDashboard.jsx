import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import StatsCard from '../../components/common/StatsCard';
import DataTable from '../../components/common/DataTable';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDepartments: 0,
    totalTeachers: 0,
    totalStudents: 0
  });

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data for now - replace with actual API calls
      setStats({
        totalUsers: 1250,
        totalDepartments: 8,
        totalTeachers: 150,
        totalStudents: 1100
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', department: 'Computer Science', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Student', department: 'Engineering', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'HOD', department: 'Mathematics', status: 'Active' }
  ];

  const recentDepartments = [
    { id: 1, name: 'Computer Science', code: 'CS', students: 150, teachers: 20, status: 'Active' },
    { id: 2, name: 'Engineering', code: 'ENG', students: 200, teachers: 25, status: 'Active' },
    { id: 3, name: 'Mathematics', code: 'MATH', students: 100, teachers: 15, status: 'Active' }
  ];

  return (
    <div className="dashboard-layout">
      <Header variant="dashboard" />
      <div className="dashboard-content">
        <Sidebar />
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.firstName} {user?.lastName}</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon="👥"
              trend="+12%"
              trendType="positive"
            />
            <StatsCard
              title="Departments"
              value={stats.totalDepartments}
              icon="🏢"
              trend="+2"
              trendType="positive"
            />
            <StatsCard
              title="Teachers"
              value={stats.totalTeachers}
              icon="👨‍🏫"
              trend="+8%"
              trendType="positive"
            />
            <StatsCard
              title="Students"
              value={stats.totalStudents}
              icon="👨‍🎓"
              trend="+15%"
              trendType="positive"
            />
          </div>

          {/* Recent Users */}
          <div className="dashboard-section">
            <h2>Recent Users</h2>
            <DataTable
              data={recentUsers}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'role', label: 'Role' },
                { key: 'department', label: 'Department' },
                { key: 'status', label: 'Status' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View user:', row) },
                { label: 'Edit', action: (row) => console.log('Edit user:', row) }
              ]}
            />
          </div>

          {/* Recent Departments */}
          <div className="dashboard-section">
            <h2>Recent Departments</h2>
            <DataTable
              data={recentDepartments}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'code', label: 'Code' },
                { key: 'students', label: 'Students' },
                { key: 'teachers', label: 'Teachers' },
                { key: 'status', label: 'Status' }
              ]}
              actions={[
                { label: 'View', action: (row) => console.log('View department:', row) },
                { label: 'Edit', action: (row) => console.log('Edit department:', row) }
              ]}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
