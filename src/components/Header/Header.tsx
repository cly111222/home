import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.styles.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // 当路由变化时关闭菜单
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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
        <Link to="/" className="logo" onClick={closeMenu}>
          LONG
        </Link>
        
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

        <button 
          className="menu-button" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link, index) => (
          <Link
            key={link.to}
            to={link.to}
            className={isActive(link.to) ? 'active' : ''}
            onClick={closeMenu}
            style={{ '--i': index } as React.CSSProperties}
          >
            {link.text}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header; 