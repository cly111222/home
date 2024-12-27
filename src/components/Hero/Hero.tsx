import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Hero.styles.css';

const Hero: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section 
      className={`hero-section ${isVisible ? 'visible' : ''}`}
      ref={elementRef as React.RefObject<HTMLElement>}
    >
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="greeting">你好，我是</span>
          <span className="name">张三</span>
          <span className="title">前端开发工程师</span>
        </h1>
        <p className="hero-description">
          专注于创建优雅、高性能的用户界面和网络应用
        </p>
        <div className="hero-cta">
          <a href="#projects" className="cta-button primary">
            查看作品
          </a>
          <a href="#contact" className="cta-button secondary">
            联系我
          </a>
        </div>
      </div>
      <div className="hero-background">
        <div className="background-shape"></div>
        <div className="background-pattern"></div>
      </div>
    </section>
  );
};

export default Hero; 