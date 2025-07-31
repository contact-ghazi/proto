import React, { useState, useEffect, useRef } from 'react'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [notification, setNotification] = useState(null)
  const newsletterInputRef = useRef(null)

  // Newsletter subscription handler
  const handleNewsletterSubscription = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      showNotification('Please enter a valid email address', 'error')
      return
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email format', 'error')
      return
    }
    
    setIsSubscribing(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      showNotification('Thank you for subscribing! You\'ll receive updates soon.', 'success')
      setEmail('')
    } catch (error) {
      showNotification('Something went wrong. Please try again.', 'error')
    } finally {
      setIsSubscribing(false)
    }
  }

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Notification system
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  // Smooth scrolling for footer links
  const handleLinkClick = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && document.activeElement === newsletterInputRef.current) {
        e.preventDefault()
        handleNewsletterSubscription(e)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [email])

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          {/* Main Footer Sections */}
          <div className="footer-main">
            {/* Legal Services Section */}
            <div className="footer-section">
              <h3>Legal Services</h3>
              <ul>
                <li><a href="#instant-lawyer" onClick={(e) => handleLinkClick(e, 'instant-lawyer')}>Instant Lawyer</a></li>
                <li><a href="#legal-consultation" onClick={(e) => handleLinkClick(e, 'legal-consultation')}>Legal Consultation</a></li>
                <li><a href="#document-review" onClick={(e) => handleLinkClick(e, 'document-review')}>Document Review</a></li>
                <li><a href="#contract-analysis" onClick={(e) => handleLinkClick(e, 'contract-analysis')}>Contract Analysis</a></li>
                <li><a href="#legal-research" onClick={(e) => handleLinkClick(e, 'legal-research')}>Legal Research</a></li>
                <li><a href="#case-evaluation" onClick={(e) => handleLinkClick(e, 'case-evaluation')}>Case Evaluation</a></li>
              </ul>
            </div>

            {/* AI Features Section */}
            <div className="footer-section">
              <h3>AI Features</h3>
              <ul>
                <li><a href="#smart-contracts" onClick={(e) => handleLinkClick(e, 'smart-contracts')}>Smart Contract Analysis</a></li>
                <li><a href="#legal-predictions" onClick={(e) => handleLinkClick(e, 'legal-predictions')}>Legal Predictions</a></li>
                <li><a href="#risk-assessment" onClick={(e) => handleLinkClick(e, 'risk-assessment')}>Risk Assessment</a></li>
                <li><a href="#compliance-check" onClick={(e) => handleLinkClick(e, 'compliance-check')}>Compliance Check</a></li>
                <li><a href="#legal-automation" onClick={(e) => handleLinkClick(e, 'legal-automation')}>Legal Automation</a></li>
                <li><a href="#ai-assistant" onClick={(e) => handleLinkClick(e, 'ai-assistant')}>AI Legal Assistant</a></li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="footer-section">
              <h3>Resources</h3>
              <ul>
                <li><a href="#legal-guides" onClick={(e) => handleLinkClick(e, 'legal-guides')}>Legal Guides</a></li>
                <li><a href="#templates" onClick={(e) => handleLinkClick(e, 'templates')}>Document Templates</a></li>
                <li><a href="#legal-news" onClick={(e) => handleLinkClick(e, 'legal-news')}>Legal News</a></li>
                <li><a href="#case-studies" onClick={(e) => handleLinkClick(e, 'case-studies')}>Case Studies</a></li>
                <li><a href="#webinars" onClick={(e) => handleLinkClick(e, 'webinars')}>Webinars</a></li>
                <li><a href="#blog" onClick={(e) => handleLinkClick(e, 'blog')}>Legal Blog</a></li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="#help-center" onClick={(e) => handleLinkClick(e, 'help-center')}>Help Center</a></li>
                <li><a href="#contact-us" onClick={(e) => handleLinkClick(e, 'contact-us')}>Contact Us</a></li>
                <li><a href="#live-chat" onClick={(e) => handleLinkClick(e, 'live-chat')}>Live Chat</a></li>
                <li><a href="#faq" onClick={(e) => handleLinkClick(e, 'faq')}>FAQ</a></li>
                <li><a href="#tutorials" onClick={(e) => handleLinkClick(e, 'tutorials')}>Tutorials</a></li>
                <li><a href="#feedback" onClick={(e) => handleLinkClick(e, 'feedback')}>Feedback</a></li>
              </ul>
            </div>

            {/* Company Section */}
            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li><a href="#about-us" onClick={(e) => handleLinkClick(e, 'about-us')}>About Us</a></li>
                <li><a href="#careers" onClick={(e) => handleLinkClick(e, 'careers')}>Careers</a></li>
                <li><a href="#press" onClick={(e) => handleLinkClick(e, 'press')}>Press</a></li>
                <li><a href="#partners" onClick={(e) => handleLinkClick(e, 'partners')}>Partners</a></li>
                <li><a href="#privacy" onClick={(e) => handleLinkClick(e, 'privacy')}>Privacy Policy</a></li>
                <li><a href="#terms" onClick={(e) => handleLinkClick(e, 'terms')}>Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-newsletter">
            <div className="newsletter-content">
              <h3>Stay Updated</h3>
              <p>Get the latest legal insights and AI updates delivered to your inbox.</p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubscription}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={newsletterInputRef}
                  disabled={isSubscribing}
                />
                <button 
                  type="submit" 
                  className="newsletter-btn"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-logo">
                <h2>Advocate AI</h2>
                <p>Clarity in Law, Justice in Action</p>
              </div>
              
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>

              <div className="footer-legal">
                <span>&copy; 2024 Advocate AI. All rights reserved.</span>
                <span className="security-badge">
                  <i className="fas fa-shield-alt"></i>
                  Secure & Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Notification Component */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-content">
            <span className="notification-message">{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => setNotification(null)}
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer 