import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../../store/slices/dashboardSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import { fetchDepartments } from '../../store/slices/departmentSlice';
import { fetchTeachers } from '../../store/slices/teacherSlice';
import { fetchStudents } from '../../store/slices/studentSlice';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import StatsCard from '../../components/common/StatsCard';
import DataTable from '../../components/common/DataTable';
import '../../components/common/Dashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { stats } = useSelector(state => state.dashboard);
  const { users } = useSelector(state => state.users);
  const { departments } = useSelector(state => state.departments);
  const { teachers } = useSelector(state => state.teachers);
  const { students } = useSelector(state => state.students);

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchUsers());
    dispatch(fetchDepartments());
    dispatch(fetchTeachers());
    dispatch(fetchStudents());
  }, [dispatch]);

  // Calculate statistics
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalHODs = users.filter(u => u.role === 'HOD').length;
  const totalDepartments = departments.length;

  // Calculate attendance (mock data for now)
  const totalPresent = Math.floor(totalStudents * 0.85);
  const totalAbsent = totalStudents - totalPresent;
  const presentPercentage = Math.round((totalPresent / totalStudents) * 100) || 0;
  const absentPercentage = 100 - presentPercentage;

  // Department-wise statistics
  const departmentStats = departments.map(dept => {
    const deptStudents = students.filter(s => s.department?._id === dept._id).length;
    const deptTeachers = teachers.filter(t => t.department?._id === dept._id).length;
    const deptPresent = Math.floor(deptStudents * 0.85);
    const deptAbsent = deptStudents - deptPresent;
    const deptPresentPercentage = deptStudents > 0 ? Math.round((deptPresent / deptStudents) * 100) : 0;
    
    return {
      ...dept,
      studentCount: deptStudents,
      teacherCount: deptTeachers,
      presentCount: deptPresent,
      absentCount: deptAbsent,
      presentPercentage: deptPresentPercentage
    };
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEdit = (item, type) => {
    console.log('Edit:', type, item);
  };

  const handleDelete = (item, type) => {
    console.log('Delete:', type, item);
  };

  // Table columns configuration
  const studentColumns = [
    { key: 'name', label: 'Name', render: (_, student) => `${student.userId?.firstName} ${student.userId?.lastName}` },
    { key: 'rollNumber', label: 'Roll Number' },
    { key: 'studentId', label: 'Student ID' },
    { key: 'department', label: 'Department', render: (_, student) => student.department?.name },
    { key: 'currentSemester', label: 'Semester' },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'status', label: 'Status', render: (_, student) => (
      <span className={`status ${student.userId?.isActive ? 'active' : 'inactive'}`}>
        {student.userId?.isActive ? 'Active' : 'Inactive'}
      </span>
    )}
  ];

  const teacherColumns = [
    { key: 'name', label: 'Name', render: (_, teacher) => `${teacher.userId?.firstName} ${teacher.userId?.lastName}` },
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'department', label: 'Department', render: (_, teacher) => teacher.department?.name },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'qualification', label: 'Qualification' },
    { key: 'experience', label: 'Experience' },
    { key: 'status', label: 'Status', render: (_, teacher) => (
      <span className={`status ${teacher.userId?.isActive ? 'active' : 'inactive'}`}>
        {teacher.userId?.isActive ? 'Active' : 'Inactive'}
      </span>
    )}
  ];

  const hodColumns = [
    { key: 'name', label: 'Name', render: (_, hod) => `${hod.firstName} ${hod.lastName}` },
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'department', label: 'Department', render: (_, hod) => hod.department?.name },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'qualification', label: 'Qualification' },
    { key: 'experience', label: 'Experience' },
    { key: 'status', label: 'Status', render: (_, hod) => (
      <span className={`status ${hod.isActive ? 'active' : 'inactive'}`}>
        {hod.isActive ? 'Active' : 'Inactive'}
      </span>
    )}
  ];

  const departmentColumns = [
    { key: 'name', label: 'Name' },
    { key: 'code', label: 'Code' },
    { key: 'studentCount', label: 'Students' },
    { key: 'teacherCount', label: 'Teachers' },
    { key: 'hod', label: 'HOD', render: (_, dept) => dept.hod?.firstName || 'Not Assigned' },
    { key: 'status', label: 'Status', render: (_, dept) => (
      <span className={`status ${dept.isActive ? 'active' : 'inactive'}`}>
        {dept.isActive ? 'Active' : 'Inactive'}
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
                  title="Total Students"
                  value={totalStudents}
                  change="↗ 10.32% Since last week"
                  icon="👥"
                />
                <StatsCard
                  title="Total Teachers"
                  value={totalTeachers}
                  change="↗ 5.20% Since last week"
                  icon="👨‍🏫"
                />
                <StatsCard
                  title="Total HODs"
                  value={totalHODs}
                  change="↗ 2.15% Since last week"
                  icon="👨‍💼"
                />
                <StatsCard
                  title="Total Departments"
                  value={totalDepartments}
                  change="↗ 1.50% Since last week"
                  icon="🏢"
                />
              </div>

              {/* Attendance Overview */}
              <div className="attendance-overview">
                <h2>Attendance Overview</h2>
                <div className="attendance-stats">
                  <div className="attendance-card present">
                    <h3>Present</h3>
                    <p className="attendance-number">{totalPresent}</p>
                    <p className="attendance-percentage">{presentPercentage}%</p>
                  </div>
                  <div className="attendance-card absent">
                    <h3>Absent</h3>
                    <p className="attendance-number">{totalAbsent}</p>
                    <p className="attendance-percentage">{absentPercentage}%</p>
                  </div>
                </div>
              </div>

              {/* Department Statistics */}
              <div className="department-stats">
                <h2>Department-wise Statistics</h2>
                <div className="department-grid">
                  {departmentStats.map(dept => (
                    <div key={dept._id} className="department-card">
                      <h3>{dept.name}</h3>
                      <div className="dept-stats">
                        <div className="dept-stat">
                          <span>Students:</span>
                          <strong>{dept.studentCount}</strong>
                        </div>
                        <div className="dept-stat">
                          <span>Teachers:</span>
                          <strong>{dept.teacherCount}</strong>
                        </div>
                        <div className="dept-stat">
                          <span>Attendance:</span>
                          <strong className={dept.presentPercentage >= 80 ? 'positive' : 'negative'}>
                            {dept.presentPercentage}%
                          </strong>
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
                <h2>Students Management</h2>
                <button className="add-btn">➕ Add New Student</button>
              </div>
              <DataTable
                data={students}
                columns={studentColumns}
                onEdit={(item) => handleEdit(item, 'student')}
                onDelete={(item) => handleDelete(item, 'student')}
                emptyMessage="No students found"
              />
            </div>
          )}

          {activeTab === 'teachers' && (
            <div className="section-content">
              <div className="section-header">
                <h2>Teachers Management</h2>
                <button className="add-btn">➕ Add New Teacher</button>
              </div>
              <DataTable
                data={teachers}
                columns={teacherColumns}
                onEdit={(item) => handleEdit(item, 'teacher')}
                onDelete={(item) => handleDelete(item, 'teacher')}
                emptyMessage="No teachers found"
              />
            </div>
          )}

          {activeTab === 'hods' && (
            <div className="section-content">
              <div className="section-header">
                <h2>HODs Management</h2>
                <button className="add-btn">➕ Add New HOD</button>
              </div>
              <DataTable
                data={users.filter(u => u.role === 'HOD')}
                columns={hodColumns}
                onEdit={(item) => handleEdit(item, 'hod')}
                onDelete={(item) => handleDelete(item, 'hod')}
                emptyMessage="No HODs found"
              />
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="section-content">
              <div className="section-header">
                <h2>Departments</h2>
              </div>
              <DataTable
                data={departmentStats}
                columns={departmentColumns}
                showActions={false}
                emptyMessage="No departments found"
              />
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="section-content">
              <div className="section-header">
                <h2>Attendance Management</h2>
              </div>
              
              <div className="attendance-details">
                <div className="attendance-summary">
                  <h3>Overall Attendance</h3>
                  <div className="attendance-bars">
                    <div className="attendance-bar">
                      <div className="bar-label">Present</div>
                      <div className="bar-container">
                        <div className="bar present" style={{width: `${presentPercentage}%`}}></div>
                        <span className="bar-text">{presentPercentage}%</span>
                      </div>
                    </div>
                    <div className="attendance-bar">
                      <div className="bar-label">Absent</div>
                      <div className="bar-container">
                        <div className="bar absent" style={{width: `${absentPercentage}%`}}></div>
                        <span className="bar-text">{absentPercentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="department-attendance">
                  <h3>Department-wise Attendance</h3>
                  <div className="dept-attendance-grid">
                    {departmentStats.map(dept => (
                      <div key={dept._id} className="dept-attendance-card">
                        <h4>{dept.name}</h4>
                        <div className="dept-attendance-stats">
                          <div className="dept-stat">
                            <span>Present:</span>
                            <strong>{dept.presentCount}</strong>
                          </div>
                          <div className="dept-stat">
                            <span>Absent:</span>
                            <strong>{dept.absentCount}</strong>
                          </div>
                          <div className="dept-stat">
                            <span>Percentage:</span>
                            <strong className={dept.presentPercentage >= 80 ? 'positive' : 'negative'}>
                              {dept.presentPercentage}%
                            </strong>
                          </div>
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

export default AdminDashboard;
