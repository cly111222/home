import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.styles.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/', text: '首页' },
    { to: '/about', text: '关于我' },
    { to: '/works', text: '项目' },
    { to: '/gallery', text: '爱好' },
    { to: '/blog', text: '博客' },
    { to: '/contact', text: '留言板' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">LONG</Link>
        
        <nav className="nav-links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? 'active' : ''}
            >
              {link.text}
            </Link>
          ))}
        </nav>

        <button className="menu-button" onClick={toggleMenu}>
          <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
        </button>
      </div>

      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={isActive(link.to) ? 'active' : ''}
            onClick={closeMenu}
          >
            {link.text}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header; 