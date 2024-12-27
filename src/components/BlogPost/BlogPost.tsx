import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { blogPosts } from '../../data/blogPosts';
import './BlogPost.styles.css';

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.id === id);

  const handleBack = () => {
    navigate(-1);
  };

  if (!post) {
    return (
      <div className="blog-post">
        <button onClick={handleBack} className="back-button">
          <span className="arrow">←</span>
          返回
        </button>
        <div className="post-header">
          <h1>文章未找到</h1>
        </div>
      </div>
    );
  }

  return (
    <article className="blog-post">
      <button onClick={handleBack} className="back-button">
        <span className="arrow">←</span>
        返回
      </button>
      
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="post-date">
            <i className="far fa-calendar"></i>
            {post.date}
          </span>
          <span className="post-category">
            <i className="far fa-folder"></i>
            {post.category}
          </span>
        </div>
        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="post-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="post-content">
        <ReactMarkdown
          components={{
            code({node, inline, className, children, ...props}: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost; 