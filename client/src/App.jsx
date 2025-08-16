import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('Login attempt:', formData)
      // Here you would typically make an API call to your backend
    }, 1000)
  }

  const handleForgotPassword = () => {
    // Handle forgot password functionality
    console.log('Forgot password clicked')
  }

  return (
    <div className="landing-page">
      <div className="container">
        {/* Header with College Branding */}
        <header className="header">
          <div className="logo-section">
            <div className="logo">
              <svg viewBox="0 0 24 24" fill="currentColor" className="logo-icon">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="college-info">
              <h1 className="college-name">XYZ College</h1>
              <p className="college-tagline">Excellence in Education</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <div className="login-section">
            <div className="login-card">
              <div className="login-header">
                <h2>Management Portal</h2>
                <p>Your central hub for academic and administrative services</p>
              </div>

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

              <div className="login-footer">
                <p>Need help? Contact IT Support</p>
                <p>© 2024 XYZ College. All rights reserved.</p>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="features-section">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Academic Management</h3>
              <p>Manage courses, grades, and academic records efficiently</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Student Services</h3>
              <p>Access student information and administrative services</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics & Reports</h3>
              <p>Generate comprehensive reports and analytics</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App


