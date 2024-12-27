import React, { useState, useEffect, useRef } from 'react';
import ImageModal from '../ImageModal/ImageModal';
import './Gallery.styles.css';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'photography' | 'paintings';
  date: string;
  width?: number;
  height?: number;
}

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'photography' | 'paintings'>('photography');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  const galleryItems: GalleryItem[] = [
    // 摄影作品
    {
      id: 'photo1',
      title: '人物写真',
      description: '人物写真摄影，捕捉自然光线下的真实表情。',
      imageUrl: '/assets/gallery/photography/6cc4e2ddc29a2879a81be04821a3b94a_origin(1).jpg',
      category: 'photography',
      date: '2023-12'
    },
    {
      id: 'photo2',
      title: '人像摄影',
      description: '自然光下的人像摄影，展现人物的自然状态。',
      imageUrl: '/assets/gallery/photography/6d7835cdca53e43cbc47470f3a96f2bb_origin(1).jpg',
      category: 'photography',
      date: '2023-11'
    },
    {
      id: 'photo3',
      title: '生活写真',
      description: '记录生活中的美好瞬间，展现人物的真实一面。',
      imageUrl: '/assets/gallery/photography/52ced3d706f2d256042a5d5c8e13e435_origin(1).jpg',
      category: 'photography',
      date: '2023-10'
    },
    {
      id: 'photo4',
      title: '人物特写',
      description: '特写镜头下的人物表情，展现内心情感。',
      imageUrl: '/assets/gallery/photography/be925507cd5125c44fcf5d0e5eb410ca_origin.jpg',
      category: 'photography',
      date: '2023-09'
    },
    {
      id: 'photo5',
      title: '日常随拍',
      description: '生活中的随意记录，定格美好时刻。',
      imageUrl: '/assets/gallery/photography/6ec22580368119ef1ff971a5cadf86c0_origin(1).jpg',
      category: 'photography',
      date: '2023-08'
    },
    {
      id: 'photo6',
      title: '人像写真',
      description: '自然光影下的人像摄影，展现人物魅力。',
      imageUrl: '/assets/gallery/photography/d167db345e52e022bb1f1e0b48cc68da_origin(1).jpg',
      category: 'photography',
      date: '2023-07'
    },
    {
      id: 'photo7',
      title: '生活记录',
      description: '记录日常生活中的精彩瞬间。',
      imageUrl: '/assets/gallery/photography/28c60c8dfb54321540f55eb34715a226_origin(1).jpg',
      category: 'photography',
      date: '2023-06'
    },
    {
      id: 'photo8',
      title: '人物写真',
      description: '自然光线下的人物写真，展现真实状态。',
      imageUrl: '/assets/gallery/photography/45460b88aa5d12d9d329b208890a0a08_origin(1).jpg',
      category: 'photography',
      date: '2023-05'
    },
    {
      id: 'photo9',
      title: '生活瞬间',
      description: '捕捉生活中的美好时刻。',
      imageUrl: '/assets/gallery/photography/ccedbd6d1f34ac2fd26dbec59ae65b26_origin(1).jpg',
      category: 'photography',
      date: '2023-04'
    },
    {
      id: 'photo10',
      title: '人像摄影',
      description: '自然光下的人像摄影作品。',
      imageUrl: '/assets/gallery/photography/378118bc927171f6b02a0ef97fdcce16_origin(1).jpg',
      category: 'photography',
      date: '2023-03'
    },
    {
      id: 'photo11',
      title: '生活写真',
      description: '记录生活中的温暖瞬间。',
      imageUrl: '/assets/gallery/photography/743e3102f3aced3cdaacb83169c1b1b6_origin(1).jpg',
      category: 'photography',
      date: '2023-02'
    },
    {
      id: 'photo12',
      title: '人物写真',
      description: '自然光影下的人物写真摄影。',
      imageUrl: '/assets/gallery/photography/e4c4f32cf214d6ec4578708f5864f288_origin(1).jpg',
      category: 'photography',
      date: '2023-01'
    },
    {
      id: 'photo13',
      title: '日常随拍',
      description: '记录生活中的点点滴滴。',
      imageUrl: '/assets/gallery/photography/aaef37bce06a958619b0dd8893b39127_origin(1).jpg',
      category: 'photography',
      date: '2022-12'
    },
    {
      id: 'photo14',
      title: '人像摄影',
      description: '自然光下的人像摄影创作。',
      imageUrl: '/assets/gallery/photography/8150f4f5419a267e9c24d8da5174b65c_origin(1).jpg',
      category: 'photography',
      date: '2022-11'
    },
    {
      id: 'photo15',
      title: '生活记录',
      description: '记录生活中的美好时光。',
      imageUrl: '/assets/gallery/photography/dd8e1669746e8e807752c1b25991a938_origin(1).jpg',
      category: 'photography',
      date: '2022-10'
    },
    {
      id: 'photo16',
      title: '人物写真',
      description: '自然光线下的人物写真作品。',
      imageUrl: '/assets/gallery/photography/e406d7a1b9c475b33612abf210314212_origin(1).jpg',
      category: 'photography',
      date: '2022-09'
    },
    {
      id: 'photo17',
      title: '生活瞬间',
      description: '捕捉生活中的精彩时刻。',
      imageUrl: '/assets/gallery/photography/77438e98b222ffc661c67567b624c80e_origin(1).jpg',
      category: 'photography',
      date: '2022-08'
    },
    // 绘画作品
    {
      id: 'art1',
      title: '水彩写生',
      description: '使用水彩颜料创作的城市街景，着重表现光影的变化和建筑的质感。',
      imageUrl: '/assets/gallery/paintings/d6c484dcba5bd57992ad3bf2c8b79963_origin(1).jpg',
      category: 'paintings',
      date: '2023-12'
    },
    {
      id: 'art2',
      title: '数字绘画',
      description: '使用数字工具创作的概念插画，融合了科幻元素和传统文化符号。',
      imageUrl: '/assets/gallery/paintings/e023477d87c4b95004d5f7bcde7ea039_origin(1).jpg',
      category: 'paintings',
      date: '2023-11'
    }
  ];

  const filteredItems = galleryItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    // 重置加载状态
    setLoadedImages(new Set());
    
    // 创建新的 IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const actualSrc = img.dataset.src;
            if (actualSrc) {
              // 创建一个新的图片对象来预加载
              const tempImg = new Image();
              tempImg.onload = () => {
                if (img.parentElement) {
                  img.src = actualSrc;
                  img.classList.add('loaded');
                  setLoadedImages(prev => new Set([...prev, actualSrc]));
                }
              };
              tempImg.src = actualSrc;
              // 停止观察这个元素
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    // 观察所有图片元素
    imageRefs.current.forEach((img) => {
      if (observerRef.current) {
        observerRef.current.observe(img);
      }
    });

    // 清理函数
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeCategory]);

  const handleImageClick = (item: GalleryItem) => {
    if (loadedImages.has(item.imageUrl)) {
      setSelectedImage(item);
    }
  };

  const setImageRef = (node: HTMLImageElement | null, imageUrl: string) => {
    if (node) {
      imageRefs.current.set(imageUrl, node);
    }
  };

  return (
    <section id="gallery" className="gallery-section">
      <h2>作品展示</h2>
      
      <div className="gallery-tabs">
        <button
          className={`tab-button ${activeCategory === 'photography' ? 'active' : ''}`}
          onClick={() => setActiveCategory('photography')}
        >
          摄影作品
        </button>
        <button
          className={`tab-button ${activeCategory === 'paintings' ? 'active' : ''}`}
          onClick={() => setActiveCategory('paintings')}
        >
          绘画作品
        </button>
      </div>

      <div className="gallery-grid">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`gallery-item ${loadedImages.has(item.imageUrl) ? 'loaded' : ''}`}
            onClick={() => handleImageClick(item)}
          >
            <div className="gallery-image-container">
              <div className="image-placeholder" />
              <img
                ref={(node) => setImageRef(node, item.imageUrl)}
                data-src={item.imageUrl}
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                alt={item.title}
                className="gallery-image"
              />
              <div className="gallery-item-overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="gallery-date">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default Gallery; 