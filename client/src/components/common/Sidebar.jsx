import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(state => state.auth);

  const getNavItems = () => {
    const role = user?.role?.toLowerCase();
    
    const baseItems = [
      { id: 'dashboard', label: '📊 Dashboard', path: '/dashboard' }
    ];

    if (role === 'admin') {
      return [
        ...baseItems,
        { id: 'students', label: '👥 Students', path: '/admin/students' },
        { id: 'teachers', label: '👨‍🏫 Teachers', path: '/admin/teachers' },
        { id: 'hods', label: '👨‍💼 HODs', path: '/admin/hods' },
        { id: 'departments', label: '🏢 Departments', path: '/admin/departments' },
        { id: 'attendance', label: '📋 Attendance', path: '/admin/attendance' }
      ];
    } else if (role === 'hod') {
      return [
        ...baseItems,
        { id: 'students', label: '👥 Students', path: '/hod/students' },
        { id: 'teachers', label: '👨‍🏫 Teachers', path: '/hod/teachers' },
        { id: 'attendance', label: '📋 Attendance', path: '/hod/attendance' },
        { id: 'reports', label: '📊 Reports', path: '/hod/reports' }
      ];
    } else if (role === 'teacher') {
      return [
        ...baseItems,
        { id: 'students', label: '👥 My Students', path: '/teacher/students' },
        { id: 'attendance', label: '📋 Attendance', path: '/teacher/attendance' },
        { id: 'assignments', label: '📝 Assignments', path: '/teacher/assignments' },
        { id: 'grades', label: '📊 Grades', path: '/teacher/grades' }
      ];
    } else if (role === 'student') {
      return [
        ...baseItems,
        { id: 'courses', label: '📚 My Courses', path: '/student/courses' },
        { id: 'attendance', label: '📋 My Attendance', path: '/student/attendance' },
        { id: 'assignments', label: '📝 Assignments', path: '/student/assignments' },
        { id: 'grades', label: '📊 My Grades', path: '/student/grades' }
      ];
    }

    return baseItems;
  };

  const handleTabClick = (item) => {
    onTabChange(item.id);
    navigate(item.path);
  };

  const navItems = getNavItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <div className="avatar">👤</div>
          <div>
            <h3>{user?.firstName} {user?.lastName}</h3>
            <p>{user?.role || 'User'}</p>
          </div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button 
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleTabClick(item)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
