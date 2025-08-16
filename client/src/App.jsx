import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser, getProfile } from './store/slices/authSlice'
import { fetchDashboardStats } from './store/slices/dashboardSlice'
import { fetchUsers } from './store/slices/userSlice'
import { fetchDepartments } from './store/slices/departmentSlice.jsx'
import { fetchTeachers } from './store/slices/teacherSlice'
import { fetchStudents } from './store/slices/studentSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading, error } = useSelector(state => state.auth)
  const { stats } = useSelector(state => state.dashboard)
  const { users } = useSelector(state => state.users)
  const { departments } = useSelector(state => state.departments)
  const { teachers } = useSelector(state => state.teachers)
  const { students } = useSelector(state => state.students)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getProfile())
    }
  }, [isAuthenticated, user, dispatch])

  // Load dashboard data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchDashboardStats())
    }
  }, [isAuthenticated, dispatch])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (isAuthenticated) {
      switch (tab) {
        case 'users':
          dispatch(fetchUsers())
          break
        case 'departments':
          dispatch(fetchDepartments())
          break
        case 'teachers':
          dispatch(fetchTeachers())
          break
        case 'students':
          dispatch(fetchStudents())
          break
        default:
          dispatch(fetchDashboardStats())
      }
    }
  }

  const handleForgotPassword = () => {
    alert('Forgot password functionality will be implemented here')
  }

  // Admin Dashboard Component
  const AdminDashboard = () => (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.firstName} {user?.lastName}</p>
        </div>
        <div className="admin-header-right">
          <span className="user-role">{user?.role}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <nav className="admin-nav">
        <button 
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleTabChange('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => handleTabChange('users')}
        >
          Users
        </button>
        <button 
          className={`nav-btn ${activeTab === 'departments' ? 'active' : ''}`}
          onClick={() => handleTabChange('departments')}
        >
          Departments
        </button>
        <button 
          className={`nav-btn ${activeTab === 'teachers' ? 'active' : ''}`}
          onClick={() => handleTabChange('teachers')}
        >
          Teachers
        </button>
        <button 
          className={`nav-btn ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => handleTabChange('students')}
        >
          Students
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-stats">
            <h2>System Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">{stats?.totalUsers || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Departments</h3>
                <p className="stat-number">{stats?.totalDepartments || 0}</p>
              </div>
              <div className="stat-card">
                <h3>HODs</h3>
                <p className="stat-number">{stats?.totalHODs || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Teachers</h3>
                <p className="stat-number">{stats?.totalTeachers || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Students</h3>
                <p className="stat-number">{stats?.totalStudents || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Attendance Records</h3>
                <p className="stat-number">{stats?.totalAttendanceRecords || 0}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="data-table">
            <h2>All Users</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.department?.name || 'N/A'}</td>
                      <td>
                        <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="data-table">
            <h2>Departments</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>HOD</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(dept => (
                    <tr key={dept._id}>
                      <td>{dept.name}</td>
                      <td>{dept.code}</td>
                      <td>
                        {dept.hod ? 
                          `${dept.hod.userId?.firstName} ${dept.hod.userId?.lastName}` : 
                          'Not Assigned'
                        }
                      </td>
                      <td>
                        <span className={`status ${dept.isActive ? 'active' : 'inactive'}`}>
                          {dept.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className="data-table">
            <h2>Teachers</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Employee ID</th>
                    <th>Department</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map(teacher => (
                    <tr key={teacher._id}>
                      <td>{teacher.userId?.firstName} {teacher.userId?.lastName}</td>
                      <td>{teacher.employeeId}</td>
                      <td>{teacher.department?.name}</td>
                      <td>{teacher.phoneNumber || 'N/A'}</td>
                      <td>
                        <span className={`status ${teacher.userId?.isActive ? 'active' : 'inactive'}`}>
                          {teacher.userId?.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="data-table">
            <h2>Students</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Department</th>
                    <th>Semester</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student._id}>
                      <td>{student.userId?.firstName} {student.userId?.lastName}</td>
                      <td>{student.rollNumber}</td>
                      <td>{student.department?.name}</td>
                      <td>{student.currentSemester || 'N/A'}</td>
                      <td>
                        <span className={`status ${student.userId?.isActive ? 'active' : 'inactive'}`}>
                          {student.userId?.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )

  // Modern Landing Page Component
  const LandingPage = () => (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="header-container">
          <div className="logo">
            <h2>Learnify</h2>
          </div>
          <nav className="nav-menu">
            <a href="#home">Home</a>
            <a href="#features">Feature</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
            <a href="#help">Help</a>
          </nav>
          <button 
            className="signup-btn"
            onClick={() => setShowLoginModal(true)}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Take your time and learn from anywhere</h1>
            <p>Empower your educational institution with our comprehensive management system. Streamline academic processes, enhance student engagement, and drive success with our modern platform.</p>
            <button 
              className="get-started-btn"
              onClick={() => setShowLoginModal(true)}
            >
              Get started
            </button>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <div className="floating-elements">
                <div className="element element-1">✓</div>
                <div className="element element-2">📚</div>
                <div className="element element-3">📝</div>
              </div>
              <div className="main-image">
                <div className="student-illustration">
                  <div className="student-avatar">👩‍🎓</div>
                  <div className="laptop">💻</div>
                  <div className="books">📚</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <h2>Our Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon">🏢</div>
              <h3>125+</h3>
              <p>Universities</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">🏫</div>
              <h3>304+</h3>
              <p>Schools</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">🎓</div>
              <h3>50K+</h3>
              <p>Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Powerful Features</h2>
          <p>Discover the tools that make learning management effortless and effective</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-image">
                <div className="feature-illustration">📝</div>
              </div>
              <h3>Assignment & Quiz</h3>
              <p>Create and manage assignments, quizzes, and assessments with ease. Track student progress and provide instant feedback.</p>
              <button className="learn-more-btn">Learn More</button>
            </div>
            
            <div className="feature-card">
              <div className="feature-image">
                <div className="feature-illustration">📊</div>
              </div>
              <h3>Automatically Grading</h3>
              <p>Save time with automated grading systems. Get instant results and detailed analytics for better insights.</p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2>They all are loved us</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar">👨‍💼</div>
              <p>"Learnify has transformed how we manage our institution. The interface is intuitive and the features are exactly what we needed."</p>
              <h4>Dr. Sarah Johnson</h4>
              <span>Dean of Engineering</span>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">👩‍🏫</div>
              <p>"The automated grading feature saves me hours every week. My students love the instant feedback system."</p>
              <h4>Prof. Michael Chen</h4>
              <span>Computer Science</span>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">👨‍🎓</div>
              <p>"As a student, I find the platform incredibly user-friendly. Everything I need is just a click away."</p>
              <h4>Alex Rodriguez</h4>
              <span>Graduate Student</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to be more productive with Learnify?</h2>
            <button 
              className="cta-btn"
              onClick={() => setShowLoginModal(true)}
            >
              Get started
            </button>
          </div>
          <div className="cta-image">
            <div className="cta-illustration">👍</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Learnify</h3>
              <p>Empowering education through technology</p>
              <div className="social-links">
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">🐦</a>
                <a href="#" className="social-link">📷</a>
                <a href="#" className="social-link">💼</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Products</h4>
              <ul>
                <li><a href="#">Overview</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Solutions</a></li>
                <li><a href="#">Tutorials</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Sales</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Available on</h4>
              <div className="app-stores">
                <div className="app-store">🍎 App Store</div>
                <div className="app-store">🤖 Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Welcome to Learnify</h2>
              <button 
                className="close-btn"
                onClick={() => setShowLoginModal(false)}
              >
                ×
              </button>
            </div>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
                
                <button 
                  type="button" 
                  className="forgot-password-btn"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
            </form>

            <div className="modal-footer">
              <p>Need help? Contact IT Support</p>
              <p>© 2024 Learnify. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return isAuthenticated ? <AdminDashboard /> : <LandingPage />
}

export default App 
