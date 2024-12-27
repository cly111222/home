import React from 'react';
import { BlogPost } from '../../data/blogPosts';
import ReactMarkdown from 'react-markdown';
import './BlogPostModal.styles.css';

interface BlogPostModalProps {
  post: BlogPost;
  onClose: () => void;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  return (
    <div className="blog-post-modal-overlay" onClick={onClose}>
      <div className="blog-post-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="blog-post-content">
          <div className="blog-post-header">
            <h2>{post.title}</h2>
            <div className="blog-post-meta">
              <span className="blog-post-date">{post.date}</span>
              <span className="blog-post-category">{post.category}</span>
            </div>
            <div className="blog-post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-post-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="blog-post-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostModal; 