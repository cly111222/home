import React from 'react';
import Blog from '../components/Blog/Blog';
import './BlogListPage.styles.css';

const BlogListPage: React.FC = () => {
  return (
    <div className="blog-list-page">
      <Blog />
    </div>
  );
};

export default BlogListPage; 