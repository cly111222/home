import React from 'react';
import './TechStack.styles.css';

interface TechSkill {
  category: string;
  skills: {
    name: string;
    level: number;  // 0-100
    description: string;
  }[];
}

const techSkills: TechSkill[] = [
  {
    category: '前端框架',
    skills: [
      {
        name: 'React',
        level: 90,
        description: '深入理解 React 原理，有丰富的实践经验'
      },
      {
        name: 'TypeScript',
        level: 85,
        description: '熟练使用 TypeScript 进行类型安全的开发'
      },
      {
        name: 'Next.js',
        level: 80,
        description: '掌握 SSR 和静态生成等现代化开发技术'
      }
    ]
  },
  {
    category: '工程化工具',
    skills: [
      {
        name: 'Webpack',
        level: 85,
        description: '能够进行深度定制和性能优化'
      },
      {
        name: 'Git',
        level: 90,
        description: '熟练使用 Git 进行团队协作开发'
      },
      {
        name: 'Docker',
        level: 75,
        description: '了解容器化部署和基本运维知识'
      }
    ]
  },
  {
    category: '性能优化',
    skills: [
      {
        name: '前端性能优化',
        level: 85,
        description: '掌握各种性能优化技术和最佳实践'
      },
      {
        name: '浏览器原理',
        level: 80,
        description: '了解浏览器渲染原理和性能瓶颈'
      }
    ]
  }
];

const TechStack: React.FC = () => {
  return (
    <section className="tech-stack-section">
      <h2>技术栈</h2>
      
      <div className="tech-categories">
        {techSkills.map((category) => (
          <div key={category.category} className="tech-category">
            <h3>{category.category}</h3>
            <div className="skills-list">
              {category.skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-level">
                      <div 
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                  <p className="skill-description">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="tech-roadmap">
        <h3>技术发展路线</h3>
        <div className="roadmap-timeline">
          <div className="timeline-item">
            <div className="timeline-date">2022</div>
            <div className="timeline-content">
              <h4>前端基础夯实</h4>
              <p>深入学习 HTML5、CSS3、JavaScript(ES6+)</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2023</div>
            <div className="timeline-content">
              <h4>框架深入学习</h4>
              <p>掌握 React 生态系统，深入理解框架原理</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2024</div>
            <div className="timeline-content">
              <h4>全栈发展</h4>
              <p>学习后端技术，迈向全栈工程师</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack; 