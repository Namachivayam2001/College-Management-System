import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(state => state.auth);

  const getNavItems = () => {
    switch (user?.role?.toLowerCase()) {
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
          { label: 'Users', path: '/admin/users', icon: '👥' },
          { label: 'Departments', path: '/admin/departments', icon: '🏢' },
          { label: 'Teachers', path: '/admin/teachers', icon: '👨‍🏫' },
          { label: 'Students', path: '/admin/students', icon: '👨‍🎓' },
          { label: 'Reports', path: '/admin/reports', icon: '📈' },
          { label: 'Settings', path: '/admin/settings', icon: '⚙️' }
        ];
      case 'hod':
        return [
          { label: 'Dashboard', path: '/hod/dashboard', icon: '📊' },
          { label: 'Department', path: '/hod/department', icon: '🏢' },
          { label: 'Teachers', path: '/hod/teachers', icon: '👨‍🏫' },
          { label: 'Students', path: '/hod/students', icon: '👨‍🎓' },
          { label: 'Courses', path: '/hod/courses', icon: '📚' },
          { label: 'Reports', path: '/hod/reports', icon: '📈' }
        ];
      case 'teacher':
        return [
          { label: 'Dashboard', path: '/teacher/dashboard', icon: '📊' },
          { label: 'Courses', path: '/teacher/courses', icon: '📚' },
          { label: 'Students', path: '/teacher/students', icon: '👨‍🎓' },
          { label: 'Assignments', path: '/teacher/assignments', icon: '📝' },
          { label: 'Grades', path: '/teacher/grades', icon: '📊' },
          { label: 'Attendance', path: '/teacher/attendance', icon: '✅' }
        ];
      case 'student':
        return [
          { label: 'Dashboard', path: '/student/dashboard', icon: '📊' },
          { label: 'Courses', path: '/student/courses', icon: '📚' },
          { label: 'Assignments', path: '/student/assignments', icon: '📝' },
          { label: 'Grades', path: '/student/grades', icon: '📊' },
          { label: 'Attendance', path: '/student/attendance', icon: '✅' },
          { label: 'Schedule', path: '/student/schedule', icon: '📅' }
        ];
      default:
        return [];
    }
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const navItems = getNavItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Navigation</h3>
      </div>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <button
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
