import React from 'react';
import { Link } from 'react-router-dom';
import About from '../components/About/About';
import './HomePage.styles.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>欢迎来到我的个人网站</h1>
          <p>我是一名前端开发工程师，热爱创造和分享</p>
          <div className="hero-buttons">
            <Link to="/about" className="primary-button">了解更多</Link>
            <Link to="/contact" className="secondary-button">联系我</Link>
          </div>
        </div>
      </section>
      <About />
    </div>
  );
};

export default HomePage; 