import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';

const Header = ({ variant = 'landing', onShowLoginModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  if (variant === 'dashboard') {
    return (
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">🎓</span>
            <h1>Learnify</h1>
          </div>
          <button className="menu-toggle">☰</button>
        </div>
        
        <div className="header-center">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <span className="search-icon">🔍</span>
          </div>
        </div>
        
        <div className="header-right">
          <button className="header-btn">⛶</button>
          <button className="header-btn">🌐 English</button>
          <button className="header-btn notification">
            🔔
            <span className="badge">1</span>
          </button>
          <button className="header-btn notification">
            💬
            <span className="badge">1</span>
          </button>
          <div className="user-profile">
            <div className="avatar">👤</div>
            <span>{user?.firstName || 'User'}</span>
            <button onClick={handleLogout} className="logout-btn">🚪</button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="landing-header">
      <div className="header-container">
        <div className="logo">
          <h2>Learnify</h2>
        </div>
        <nav className="nav-menu">
          {/* Use <Link> for internal navigation */}
          <Link to="/">Home</Link> 
          <Link to="/">About</Link> 
          <Link to="/">Contact</Link>
        </nav>
        <button 
          className="signup-btn"
          onClick={onShowLoginModal}
        >
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
