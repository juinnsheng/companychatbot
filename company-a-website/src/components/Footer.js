import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Company A</h3>
          <p>Innovating Tomorrow, Today</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Business Units</li>
            <li>Sustainability</li>
            <li>Careers</li>
            <li>Media</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>+60 3 2161 8888</li>
            <li>info@companya.com</li>
            <li>Kuala Lumpur, Malaysia</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li>LinkedIn</li>
            <li>Twitter</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Company A. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;