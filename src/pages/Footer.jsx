import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [notification, setNotification] = useState(null);
  const newsletterInputRef = useRef(null);
  const [openSections, setOpenSections] = useState({});

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleNewsletterSubscription = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email format', 'error');
      return;
    }
    setIsSubscribing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showNotification("Thank you for subscribing! You'll receive updates soon.", 'success');
      setEmail('');
    } catch (error) {
      showNotification('Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubscribing(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && document.activeElement === newsletterInputRef.current) {
        e.preventDefault();
        handleNewsletterSubscription(e);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [email]);

  const sections = [
    {
      title: 'Legal Services',
      id: 'legal',
      links: [
        ['instant-lawyer', 'Instant Lawyer'],
        ['legal-consultation', 'Legal Consultation'],
        ['document-review', 'Document Review'],
        ['contract-analysis', 'Contract Analysis'],
        ['legal-research', 'Legal Research'],
        ['case-evaluation', 'Case Evaluation'],
      ],
    },
    {
      title: 'AI Features',
      id: 'ai',
      links: [
        ['smart-contracts', 'Smart Contract Analysis'],
        ['legal-predictions', 'Legal Predictions'],
        ['risk-assessment', 'Risk Assessment'],
        ['compliance-check', 'Compliance Check'],
        ['legal-automation', 'Legal Automation'],
        ['ai-assistant', 'AI Legal Assistant'],
      ],
    },
    {
      title: 'Resources',
      id: 'resources',
      links: [
        ['legal-guides', 'Legal Guides'],
        ['templates', 'Document Templates'],
        ['legal-news', 'Legal News'],
        ['case-studies', 'Case Studies'],
        ['webinars', 'Webinars'],
        ['blog', 'Legal Blog'],
      ],
    },
    {
      title: 'Support',
      id: 'support',
      links: [
        ['help-center', 'Help Center'],
        ['contact-us', 'Contact Us'],
        ['live-chat', 'Live Chat'],
        ['faq', 'FAQ'],
        ['tutorials', 'Tutorials'],
        ['feedback', 'Feedback'],
      ],
    },
    {
      title: 'Company',
      id: 'company',
      links: [
        ['about-us', 'About Us'],
        ['careers', 'Careers'],
        ['press', 'Press'],
        ['partners', 'Partners'],
        ['privacy', 'Privacy Policy'],
        ['terms', 'Terms of Service'],
      ],
    },
  ];

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            {sections.map(({ title, id, links }) => (
              <div
  className={`footer-section ${
    isMobile ? 'border border-blue-600 rounded-xl p-2 bg-[#0f172a]' : ''
  }`}
  key={id}
>

                <h3
                  className="footer-section-title flex justify-between items-center cursor-pointer text-white text-lg font-semibold"
                  onClick={() => toggleSection(id)}
                >
                  {title}
                  <span className="dropdown-icon">{openSections[id] ? '▲' : ''}</span>
                </h3>

                <ul className={`footer-links transition-all duration-300 ease-in-out ${openSections[id] ? 'open' : 'closed'}`}>
                  {links.map(([targetId, label]) => (
                    <li key={targetId}>
                      <a
                        href={`#${targetId}`}
                        onClick={(e) => handleLinkClick(e, targetId)}
                        className="text-gray-300 hover:text-white block mt-2"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

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
                <button type="submit" className="newsletter-btn" disabled={isSubscribing}>
                  {isSubscribing ? <><i className="fas fa-spinner fa-spin"></i> Subscribing...</> : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-logo">
                <h2>Advocate AI</h2>
                <p>Clarity in Law, Justice in Action</p>
              </div>
              <div className="footer-social flex gap-4">
  <a href="#" className="social-link" aria-label="LinkedIn">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-gray-300 hover:text-blue-500 transition" viewBox="0 0 24 24">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.7v2.16h.05c.52-1.01 1.79-2.16 3.7-2.16 3.95 0 4.7 2.6 4.7 5.99V24h-4v-8.52c0-2.03-.04-4.64-2.83-4.64-2.84 0-3.27 2.22-3.27 4.51V24h-4V8z" />
    </svg>
  </a>

  <a href="#" className="social-link" aria-label="Twitter">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-gray-300 hover:text-sky-400 transition" viewBox="0 0 24 24">
      <path d="M24 4.56c-.89.39-1.84.65-2.84.77a4.92 4.92 0 0 0 2.16-2.71 9.79 9.79 0 0 1-3.13 1.2 4.92 4.92 0 0 0-8.39 4.49A13.94 13.94 0 0 1 1.67 3.15a4.92 4.92 0 0 0 1.52 6.57A4.93 4.93 0 0 1 .96 9.1v.06a4.92 4.92 0 0 0 3.95 4.83 4.93 4.93 0 0 1-2.21.08 4.93 4.93 0 0 0 4.6 3.42A9.86 9.86 0 0 1 0 20.58a13.92 13.92 0 0 0 7.56 2.22c9.05 0 14-7.5 14-14v-.64A9.88 9.88 0 0 0 24 4.56z" />
    </svg>
  </a>

  <a href="#" className="social-link" aria-label="Facebook">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-gray-300 hover:text-blue-600 transition" viewBox="0 0 24 24">
      <path d="M22.67 0H1.33A1.34 1.34 0 0 0 0 1.33v21.34C0 23.4.6 24 1.33 24H12.8v-9.33H9.69V11h3.11V8.4c0-3.1 1.88-4.8 4.63-4.8 1.32 0 2.45.1 2.78.14v3.22h-1.91c-1.5 0-1.8.71-1.8 1.77V11h3.59l-.47 3.67h-3.12V24h6.12A1.34 1.34 0 0 0 24 22.67V1.33A1.34 1.34 0 0 0 22.67 0" />
    </svg>
  </a>

  <a href="#" className="social-link" aria-label="Instagram">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-gray-300 hover:text-pink-500 transition" viewBox="0 0 24 24">
      <path d="M7.75 2h8.5C20 2 22 4 22 7.75v8.5C22 20 20 22 16.25 22h-8.5C4 22 2 20 2 16.25v-8.5C2 4 4 2 7.75 2zm0 2C5.68 4 4 5.68 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5C18.32 20 20 18.32 20 16.25v-8.5C20 5.68 18.32 4 16.25 4h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  </a>
</div>

              <div className="footer-legal">
                <span>&copy; 2024 Advocate AI. All rights reserved.</span>
                <span className="security-badge"><i className="fas fa-shield-alt"></i> Secure & Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-content">
            <span className="notification-message">{notification.message}</span>
            <button className="notification-close" onClick={() => setNotification(null)} aria-label="Close notification">&times;</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
