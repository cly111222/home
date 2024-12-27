import React, { useEffect } from 'react';
import Header from '../Header/Header';
import About from '../About/About';
import Skills from '../Skills/Skills';
import Experience from '../Experience/Experience';
import Works from '../Works/Works';
import Gallery from '../Gallery/Gallery';
import Blog from '../Blog/Blog';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import './HomePage.styles.css';

const HomePage: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <Header />
      <main>
        <About />
        <Skills />
        <Experience />
        <Works />
        <Gallery />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage; 