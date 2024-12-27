import React from 'react';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import ProjectShowcase from '../../components/ProjectShowcase/ProjectShowcase';
import './Home.styles.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Hero />
      <About />
      <ProjectShowcase />
    </div>
  );
};

export default Home; 