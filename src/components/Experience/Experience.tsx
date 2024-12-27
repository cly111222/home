import React from 'react';
import './Experience.styles.css';

interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    company: "四川翻台宝科技有限公司",
    position: "中级Web前端工程师",
    period: "2024.03-至今",
    location: "成都",
    responsibilities: [
      "设计和实现人事信息管理、员工培训记录管理等核心功能",
      "自动化管理员工入职、转岗、调岗、离职等流程",
      "开发晋升管理和黑名单管理功能，确保人事变动的合规性",
      "优化花名册页面，提供便捷的员工信息查询和管理功能",
      "对接OA系统，实现审批流程的自动化，减少人工操作，提高工作效率",
      "设计和实现薪酬填写组件，支持多种薪酬结构的快速录入和修改",
      "开发选择组织组件，简化组织结构的选择和管理流程",
      "实现组织信息的回显功能，确保数据的准确性和一致性",
      "维护和开发动态表单，实现选项式回显、数值校验、文件图片上传、数据联动等功能，达到高度灵活的复用性"
    ],
    technologies: [
      "React", "TypeScript", "Ant Design",
      "Umi.js", "Dva.js", "Less"
    ]
  },
  {
    company: "上海领迹（短期项目）",
    position: "Web前端工程师",
    period: "2023.06-2024.03",
    location: "上海",
    responsibilities: [
      "参与大数据平台的前端开发工作，负责数据预制、数据质检、非标准数据入户和工具平台开发等内容",
      "完成由elementUi组件到jup组件（基于ant组件的二次封装）的升级工作",
      "对项目中的安全漏洞进行修复工作（注入式攻击，依赖版本不合规）",
      "封装常用组件（优化select组件，解决渲染卡顿），提高代码复用性和开发效率"
    ],
    technologies: [
      "Vue.js", "Element UI", "JUP组件库",
      "Webpack", "ES6+", "Less"
    ]
  },
  {
    company: "成都峰越有限公司",
    position: "Web前端工程师",
    period: "2021.02-2023.06",
    location: "成都",
    responsibilities: [
      "负责多个项目的前端开发，包括设计、开发和维护工作",
      "灵活运用React、Vue2、Vue3、Uni-App、H5、jQuery等技术栈，确保项目的高效开发和优秀用户体验",
      "参与后台管理系统、微信小程序、公司官网等业务的开发",
      "开发公司商城项目管理系统，包括商品管理、订单管理等功能",
      "开发权限控制模块，实现路由权限，菜单权限，按钮权限",
      "开发多级地址创建组件（递归组件实现）",
      "开发维护商品属性的全相连映射表单，自动填充关键字",
      "封装通用的表格组件，提高开发效率和代码复用性"
    ],
    technologies: [
      "React", "Vue.js", "Uni-App",
      "jQuery", "Element UI", "Ant Design",
      "微信小程序"
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience-section">
      <h2>工作经历</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="experience-header">
                <h3>{exp.position}</h3>
                <div className="company-info">
                  <span className="company">{exp.company}</span>
                  <span className="period">{exp.period}</span>
                  <span className="location">{exp.location}</span>
                </div>
              </div>
              <div className="responsibilities">
                <h4>主要职责：</h4>
                <ul>
                  {exp.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="technologies">
                <h4>技术栈：</h4>
                <div className="tech-tags">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience; 