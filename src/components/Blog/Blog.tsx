import React, { useState } from 'react';
import { blogPosts, BlogPost } from '../../data/blogPosts';
import BlogPostModal from '../BlogPostModal/BlogPostModal';
import './Blog.styles.css';

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <section id="blog" className="blog-section">
      <h2>技术博客</h2>
      
      <div className="blog-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? '全部' : category}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {filteredPosts.map((post) => (
          <article 
            key={post.id} 
            className="blog-card"
            onClick={() => handlePostClick(post)}
          >
            <div className="blog-card-content">
              <h3>{post.title}</h3>
              <p className="blog-description">{post.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-date">{post.date}</span>
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedPost && (
        <BlogPostModal
          post={selectedPost}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Blog; 