import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return (
      <div className="blog-post">
        <div className="post-header">
          <h1>文章未找到</h1>
          <Link to="/" className="back-to-blog">
            <span className="arrow">←</span>
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="blog-post">
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
          <span className="post-category">{post.category}</span>
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

      <div className="post-footer">
        <Link to="/#blog" className="back-to-blog">
          <span className="arrow">←</span>
          返回博客列表
        </Link>
      </div>
    </article>
  );
};

export default BlogPost; 