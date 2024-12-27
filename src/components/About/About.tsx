import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './About.styles.css';

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

const skills: Skill[] = [
  { name: 'React', level: 90 },
  { name: 'Vue', level: 85 },
  { name: 'TypeScript', level: 85 },
  { name: 'ES6+', level: 88 },
  { name: 'Node.js', level: 80 },
  { name: 'Next.js', level: 75 },
  { name: 'CSS/SCSS', level: 85 }
];

const About: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section 
      className={`about-section ${isVisible ? 'visible' : ''}`} 
      id="about"
      ref={elementRef as React.RefObject<HTMLElement>}
    >
      <div className="about-content">
        <div className="about-text">
          <h2>关于我</h2>
          <p>
            我是一名充满热情的前端开发工程师，拥有5年的开发经验。我专注于创建用户友好、高性能的 Web 应用程序，
            并且热衷于学习和应用最新的技术。
          </p>
          <p>
            在我的职业生涯中，我参与过多个大型项目的开发，包括电商平台、企业管理系统和社交媒体应用。
            我擅长使用 React 生态系统构建现代化的用户界面，并且对性能优化和用户体验有着深入的理解。
          </p>
        </div>
        
        <div className="skills-section">
          <h3>技能专长</h3>
          <div className="skills-grid">
            {skills.map(skill => (
              <div key={skill.name} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="experience-highlights">
          <h3>工作经历</h3>
          <div className="highlights-grid">
            <div className="highlight-item">
              <div className="highlight-icon">🚀</div>
              <h4>高级前端开发工程师</h4>
              <p>ABC科技有限公司 | 2020-至今</p>
              <ul>
                <li>负责公司核心产品的前端架构设计和开发</li>
                <li>带领团队完成多个重要项目的交付</li>
                <li>优化前端性能，提升用户体验</li>
              </ul>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">💡</div>
              <h4>前端开发工程师</h4>
              <p>XYZ互联网公司 | 2018-2020</p>
              <ul>
                <li>参与电商平台的开发和维护</li>
                <li>实现复杂的用户界面和交互功能</li>
                <li>与后端团队协作优化接口设计</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 