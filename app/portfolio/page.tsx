'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './page.module.css';

const categories = ['All', 'Weddings', 'Corporate', 'Celebrations', 'Concerts', 'Portraits'];

const galleryItems = [
  { src: '/images/hero.png', alt: 'Wedding ceremony at sunset', category: 'Weddings', span: 'tall' },
  { src: '/images/wedding.png', alt: 'First dance', category: 'Weddings', span: 'normal' },
  { src: '/images/birthday.png', alt: 'Birthday celebration', category: 'Celebrations', span: 'normal' },
  { src: '/images/hero.png', alt: 'Corporate gala', category: 'Corporate', span: 'wide' },
  { src: '/images/wedding.png', alt: 'Concert performer', category: 'Concerts', span: 'normal' },
  { src: '/images/birthday.png', alt: 'Portrait session', category: 'Portraits', span: 'tall' },
  { src: '/images/hero.png', alt: 'Wedding reception', category: 'Weddings', span: 'normal' },
  { src: '/images/wedding.png', alt: 'Corporate event', category: 'Corporate', span: 'normal' },
  { src: '/images/birthday.png', alt: 'Festival moments', category: 'Concerts', span: 'wide' },
];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === active);

  return (
    <>
      <section className={styles.hero}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className={styles.label}>THE WORK</p>
            <h1 className={styles.title}>
              Portfolio
            </h1>
            <p className={styles.subtitle}>
              A curated collection of moments from weddings, events, and celebrations.
              Each image represents a story told through light, emotion, and artistry.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section ${styles.gallery}`}>
        <div className="container-wide">
          {/* Filters */}
          <ScrollReveal>
            <div className={styles.filters}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
                  onClick={() => setActive(cat)}
                  id={`filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className={styles.grid}>
            {filtered.map((item, i) => (
              <ScrollReveal key={`${item.alt}-${i}`} delay={i * 80}>
                <div
                  className={`${styles.gridItem} ${styles[item.span]}`}
                  onClick={() => setLightbox(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setLightbox(i)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className={styles.gridOverlay}>
                    <span className={styles.gridCategory}>{item.category}</span>
                    <span className={styles.gridCaption}>{item.alt}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Close">
            ✕
          </button>
          <button
            className={styles.lightboxPrev}
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(lightbox > 0 ? lightbox - 1 : filtered.length - 1);
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <div className={styles.lightboxImage} onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              fill
              style={{ objectFit: 'contain' }}
              sizes="90vw"
            />
          </div>
          <button
            className={styles.lightboxNext}
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(lightbox < filtered.length - 1 ? lightbox + 1 : 0);
            }}
            aria-label="Next"
          >
            ›
          </button>
          <div className={styles.lightboxCaption}>
            <span>{filtered[lightbox].alt}</span>
            <span className={styles.lightboxCount}>
              {lightbox + 1} / {filtered.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
