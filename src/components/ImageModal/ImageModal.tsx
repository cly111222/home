import React, { useEffect, useState } from 'react';
import './ImageModal.styles.css';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'photography' | 'paintings';
  date: string;
}

interface ImageModalProps {
  image: GalleryItem;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageLoaded(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-content ${imageLoaded ? 'loaded' : ''}`}>
        <button className="modal-close" onClick={onClose} aria-label="关闭">
          <span>×</span>
        </button>
        
        <div className="modal-image-container">
          {isLoading && (
            <div className="modal-loading">
              <div className="loading-spinner"></div>
            </div>
          )}
          <img
            src={image.imageUrl}
            alt={image.title}
            className="modal-image"
            onLoad={handleImageLoad}
          />
        </div>

        <div className="modal-info">
          <div className="modal-header">
            <h2>{image.title}</h2>
            <div className="modal-meta">
              <span className="modal-category">{image.category === 'photography' ? '摄影作品' : '绘画作品'}</span>
              <span className="modal-date">{image.date}</span>
            </div>
          </div>
          <p className="modal-description">{image.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal; 