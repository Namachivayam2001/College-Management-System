import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import LoginModal from '../components/common/LoginModal';

const HomePage = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="landing-page">
      <Header variant="landing" onShowLoginModal={() => setShowLoginModal(true)} />
      
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

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default HomePage;
