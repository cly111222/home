import React, { useState } from 'react';
import './Works.styles.css';

interface Project {
  id: string;
  period: string;
  name: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
  imageUrl?: string;
}

const Works: React.FC = () => {
  const projects: Project[] = [
    {
      id: 'ftb',
      period: '2024.03-至今',
      name: '翻台宝管理系统',
      description: '翻台宝是专门为店铺打造的移动办公平台，用户可以在线处理各种店铺事务。综合性非常强，快速处理各种店铺订单，帮助用户提高工作效率，快速查阅各种店铺财务数据，还可以在线发布各种店铺活动，方便用户管理店铺。',
      technologies: [
        'Vue', 'Vue Router', 'Vuex', 'Axios', 'Echarts',
        'ElementUI', 'Jup', 'Ant Design', 'Webpack'
      ],
      responsibilities: [
        '设计和实现人事信息管理、员工培训记录管理等核心功能',
        '自动化管理员工入职、转岗、调岗、离职等流程',
        '开发晋升管理和黑名单管理功能，确保人事变动的合规性',
        '优化花名册页面，提供便捷的员工信息查询和管理功能',
        '对接OA系统，实现审批流程的自动化，减少人工操作，提高工作效率',
        '设计和实现薪酬填写组件，支持多种薪酬结构的快速录入和修改',
        '开发选择组织组件，简化组织结构的选择和管理流程',
        '实现组织信息的回显功能，确保数据的准确性和一致性',
        '维护和开发动态表单，实现选项式回显、数值校验、文件图片上传、数据联动等功能'
      ]
    },
    {
      id: 'bigdata',
      period: '2023.06-2024.03',
      name: '大数据平台',
      description: '该项目旨在开发大数据平台的前端部分，用于数据预处理、数据质检、非标准数据入户以及工具平台开发，以满足大数据平台的开发需求。',
      technologies: [
        'React', 'React Router', 'Redux', 'Axios',
        'Echarts', 'Jup', 'Ant Design', 'Webpack'
      ],
      responsibilities: [
        '负责数据预制、数据质检、非标准数据入湖和工具平台开发等前端工作',
        '成功完成了antd组件到Jup组件的升级，提高了整体的用户体验和性能',
        '有效修复了项目中的安全漏洞（注入式攻击，依赖版本不合规）',
        '设计并开发了多个公共组件（优化select组件，解决渲染卡顿）'
      ]
    },
    {
      id: 'sunny',
      period: '2022.12-2023.04',
      name: 'Sunny商城',
      description: '这是一个全面的商城后台管理系统，提供了商品查询、人员管理等多种必要功能，旨在为用户提供完善的购物体验。项目中还包括使用Three.js进行数据可视化。',
      technologies: [
        'React', 'React Router', 'Redux', 'Axios',
        'Recharts', 'Ant Design', 'H5', 'Three.js'
      ],
      responsibilities: [
        '开发公司商城项目管理系统，包括商品管理、订单管理等功能，提高运营效率',
        '开发权限控制模块，适配路由权限、菜单权限和按钮权限',
        '开发多级地址创建组件，通过递归组件实现，简化复杂地址管理流程',
        '开发维护商品属性的全相连映射表单，自动填充关键字',
        '封装通用的表格组件，提高开发效率和代码复用性'
      ]
    }
  ];

  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  return (
    <section id="works" className="works-section">
      <h2>项目经验</h2>
      <div className="works-container">
        <div className="project-list">
          {projects.map(project => (
            <div
              key={project.id}
              className={`project-item ${activeProject.id === project.id ? 'active' : ''}`}
              onClick={() => setActiveProject(project)}
            >
              <h3>{project.name}</h3>
              <span className="project-period">{project.period}</span>
            </div>
          ))}
        </div>

        <div className="project-details">
          <div className="project-header">
            <h3>{activeProject.name}</h3>
            <span className="period">{activeProject.period}</span>
          </div>

          <div className="project-description">
            <h4>项目描述：</h4>
            <p>{activeProject.description}</p>
          </div>

          <div className="project-tech">
            <h4>技术栈：</h4>
            <div className="tech-tags">
              {activeProject.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="project-responsibilities">
            <h4>主要职责：</h4>
            <ul>
              {activeProject.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works; 