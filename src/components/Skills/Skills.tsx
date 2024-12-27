import React from 'react';
import './Skills.styles.css';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      category: '核心技能',
      skills: [
        { name: 'HTML/CSS', level: 95, color: '#E34F26' },
        { name: 'JavaScript/ES6', level: 95, color: '#F7DF1E' },
        { name: 'React', level: 90, color: '#61DAFB' },
        { name: 'Vue', level: 90, color: '#4FC08D' },
        { name: 'TypeScript', level: 85, color: '#3178C6' },
      ]
    },
    {
      category: '框架 & 工具',
      skills: [
        { name: 'Vue Router/Vuex', level: 90, color: '#42b883' },
        { name: 'React Router/Redux', level: 90, color: '#764ABC' },
        { name: 'ElementUI/Ant Design', level: 90, color: '#1890FF' },
        { name: 'Webpack/Vite', level: 80, color: '#8DD6F9' },
        { name: 'Git', level: 85, color: '#F05032' },
      ]
    },
    {
      category: '其他技能',
      skills: [
        { name: '微信小程序', level: 85, color: '#07C160' },
        { name: 'Uni-App', level: 85, color: '#2B9939' },
        { name: 'Three.js', level: 80, color: '#000000' },
        { name: 'Echarts', level: 85, color: '#AA344D' },
        { name: 'Python/SQL', level: 75, color: '#3776AB' },
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <h2>专业技能</h2>
      <div className="skills-container">
        {skillCategories.map((category) => (
          <div key={category.category} className="skill-category">
            <h3>{category.category}</h3>
            <div className="skills-grid">
              {category.skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="additional-skills">
        <h3>其他技能描述</h3>
        <ul>
          <li>熟练掌握 HTML、CSS、ES5 以及 ES6 新特性，熟悉 W3C 标准和 H5 语义化标签，http 协议</li>
          <li>熟练掌握 Vue（vue+vue-router+vuex+axios）组件化开发，灵活运用 Vue 特性（filters、directive），熟悉 Vue 响应式原理</li>
          <li>熟练掌握 react(react+react-router+redux+axios), 面对对象编程 class（this，继承），函数编程（hook,hoc），fiber 等</li>
          <li>熟练使用 ajax、axios，fetch 实现前后端通信</li>
          <li>熟练使用 PhotoShop, scktch 等设计工具</li>
        </ul>
      </div>
    </section>
  );
};

export default Skills; 