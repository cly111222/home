import React from 'react';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Experience from '../components/Experience/Experience';
import './AboutPage.styles.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <About />
      <Skills />
      <Experience />
    </div>
  );
};

export default AboutPage; 