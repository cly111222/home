import React from 'react';
import { Link } from 'react-router-dom';
import { FaGit, FaEnvelope } from 'react-icons/fa';
import './Footer.styles.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>导航</h3>
          <nav className="footer-nav">
            <Link to="/">首页</Link>
            <Link to="/about">关于我</Link>
            <Link to="/works">项目</Link>
            <Link to="/gallery">爱好</Link>
            <Link to="/blog">博客</Link>
            <Link to="/contact">留言板</Link>
          </nav>
        </div>
        
        <div className="footer-section">
          <h3>联系方式</h3>
          <div className="contact-info">
            <a href="https://gitee.com/long--yin" target="_blank" rel="noopener noreferrer">
              <FaGit /> Gitee
            </a>
            <div className="contact-item">
              <FaEnvelope /> 648705735@qq.com
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 个人作品集. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 