'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../app/portfolio/page.module.css';

export default function PortfolioGallery({ categories, items }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL'
    ? items
    : items.filter(item => item.category === activeFilter);

  return (
    <>
      <section className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip text-label-caps ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className={styles.gallery}>
        <div className="masonry-grid">
          {filtered.map((item, i) => (
            <div key={i} className={`masonry-item ${styles.galleryItem} img-hover-zoom`}>
              <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                <Image 
                  src={item.image} 
                  alt={item.alt} 
                  fill 
                  className={styles.galleryImage} 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={`overlay-hover ${styles.galleryOverlay}`}>
                <div className={styles.galleryInfo}>
                  <span className="text-label-caps color-white">{item.category}</span>
                  <h3 className="text-headline-sm color-white">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
