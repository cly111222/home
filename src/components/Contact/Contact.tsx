import React, { useState, useEffect } from 'react';
import './Contact.styles.css';

interface Message {
  id: string;
  name: string;
  email: string;
  content: string;
  timestamp: string;
}

const Contact: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // 从localStorage加载消息
  useEffect(() => {
    const savedMessages = localStorage.getItem('guestbookMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // 保存消息到localStorage
  useEffect(() => {
    localStorage.setItem('guestbookMessages', JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.content) {
      setSubmitStatus('error');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toLocaleString()
    };

    setMessages(prev => [newMessage, ...prev]);
    setFormData({
      name: '',
      email: '',
      content: ''
    });
    setSubmitStatus('success');

    // 3秒后清除状态提示
    setTimeout(() => {
      setSubmitStatus(null);
    }, 3000);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  return (
    <section id="contact" className="contact-section">
      <h2>留言板</h2>
      
      <div className="contact-container">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="您的称呼"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="您的邮箱"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="content"
                placeholder="留言内容"
                value={formData.content}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              提交留言
            </button>

            {submitStatus && (
              <div className={`submit-message ${submitStatus}`}>
                {submitStatus === 'success' ? '留言成功！' : '请填写所有字段！'}
              </div>
            )}
          </form>
        </div>

        <div className="contact-info">
          <h3>最新留言</h3>
          <div className="messages-list">
            {messages.length > 0 ? (
              messages.map(message => (
                <div key={message.id} className="message-item">
                  <div className="message-header">
                    <span className="message-name">{message.name}</span>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                  <div className="message-content">{message.content}</div>
                  <button 
                    className="delete-button"
                    onClick={() => deleteMessage(message.id)}
                    title="删除留言"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))
            ) : (
              <p className="no-messages">暂无留言</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 