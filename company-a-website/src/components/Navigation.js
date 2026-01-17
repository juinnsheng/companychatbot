import React, { useState } from 'react';

function Navigation({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'business-units', label: 'Business Units' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'media', label: 'Media' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="logo" onClick={() => handleNavClick('home')}>
          Company <span>A</span>
        </div>
        
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li
              key={item.id}
              className={currentPage === item.id ? 'active' : ''}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;