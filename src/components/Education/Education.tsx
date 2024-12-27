import React from 'react';
import './Education.styles.css';

interface Education {
  school: string;
  degree: string;
  major: string;
  period: string;
  location: string;
  achievements: string[];
}

const educations: Education[] = [
  {
    school: "四川工商学院",
    degree: "本科",
    major: "计算机科学与技术",
    period: "2017.09-2021.06",
    location: "成都",
    achievements: [
      "主修课程：数据结构、算法设计、计算机网络、操作系统、数据库系统等",
      "参与校内Web开发项目，负责前端开发工作",
      "获得校级编程竞赛三等奖",
      "英语CET-4证书"
    ]
  }
];

const Education: React.FC = () => {
  return (
    <section id="education" className="education-section">
      <h2>教育背景</h2>
      <div className="education-list">
        {educations.map((edu, index) => (
          <div key={index} className="education-item">
            <div className="education-header">
              <h3>{edu.school}</h3>
              <div className="education-info">
                <span className="degree">{edu.degree} · {edu.major}</span>
                <span className="period">{edu.period}</span>
                <span className="location">{edu.location}</span>
              </div>
            </div>
            <div className="achievements">
              <h4>在校经历：</h4>
              <ul>
                {edu.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education; 