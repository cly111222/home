import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './ProjectShowcase.styles.css';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  challenges: {
    problem: string;
    solution: string;
  }[];
  performance: {
    metric: string;
    improvement: string;
  }[];
  demoUrl?: string;
  sourceUrl?: string;
  screenshots: string[];
}

const projects: Project[] = [
  {
    id: 'personal-portfolio',
    title: '个人作品集网站',
    description: '使用 React + TypeScript 开发的个人作品集网站，展示个人项目和技术博客。',
    techStack: [
      'React',
      'TypeScript',
      'CSS3',
      'React Router',
      'Markdown'
    ],
    features: [
      '响应式设计，适配各种设备',
      '博客系统支持 Markdown 渲染',
      '项目展示与筛选功能',
      '深色模式支持',
      '性能优化与懒加载'
    ],
    challenges: [
      {
        problem: '图片加载性能问题',
        solution: '实现图片懒加载和渐进式加载，优化用户体验'
      },
      {
        problem: '博客内容管理',
        solution: '使用 Markdown 文件管理博客内容，便于维护和更新'
      }
    ],
    performance: [
      {
        metric: '首屏加载时间',
        improvement: '从 3s 优化到 1.5s'
      },
      {
        metric: 'Lighthouse 性能评分',
        improvement: '从 75 提升到 95'
      }
    ],
    demoUrl: 'https://your-portfolio.com',
    sourceUrl: 'https://github.com/your-username/portfolio',
    screenshots: [
      '/assets/projects/portfolio-1.jpg',
      '/assets/projects/portfolio-2.jpg'
    ]
  }
];

const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section 
      className={`project-showcase-section ${isVisible ? 'visible' : ''}`}
      ref={elementRef as React.RefObject<HTMLElement>}
    >
      <h2>项目展示</h2>
      
      <div className="projects-grid">
        {projects.map(project => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-preview">
              <img 
                src={project.screenshots[0]} 
                alt={project.title}
                className="project-thumbnail"
              />
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech-stack">
                {project.techStack.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" onClick={e => e.stopPropagation()}>
            <button 
              className="close-button"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            
            <div className="project-details">
              <h2>{selectedProject.title}</h2>
              
              <div className="project-screenshots">
                {selectedProject.screenshots.map((screenshot, index) => (
                  <img 
                    key={index}
                    src={screenshot}
                    alt={`${selectedProject.title} screenshot ${index + 1}`}
                  />
                ))}
              </div>

              <div className="project-section">
                <h3>项目描述</h3>
                <p>{selectedProject.description}</p>
              </div>

              <div className="project-section">
                <h3>技术栈</h3>
                <div className="tech-tags">
                  {selectedProject.techStack.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-section">
                <h3>主要功能</h3>
                <ul>
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-section">
                <h3>技术难点与解��方案</h3>
                {selectedProject.challenges.map((challenge, index) => (
                  <div key={index} className="challenge-item">
                    <h4>问题：{challenge.problem}</h4>
                    <p>解决方案：{challenge.solution}</p>
                  </div>
                ))}
              </div>

              <div className="project-section">
                <h3>性能优化</h3>
                {selectedProject.performance.map((item, index) => (
                  <div key={index} className="performance-item">
                    <span className="metric">{item.metric}：</span>
                    <span className="improvement">{item.improvement}</span>
                  </div>
                ))}
              </div>

              <div className="project-links">
                {selectedProject.demoUrl && (
                  <a 
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    查看演示
                  </a>
                )}
                {selectedProject.sourceUrl && (
                  <a 
                    href={selectedProject.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    源代码
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectShowcase; 