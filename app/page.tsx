'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedText from '@/components/AnimatedText';
import styles from './page.module.css';

const featuredWork = [
  {
    src: '/images/hero.png',
    alt: 'Wedding ceremony at sunset',
    category: 'Weddings',
  },
  {
    src: '/images/wedding.png',
    alt: 'First dance at elegant reception',
    category: 'Weddings',
  },
  {
    src: '/images/birthday.png',
    alt: 'Intimate birthday celebration',
    category: 'Celebrations',
  },
];

const testimonials = [
  {
    quote: "The images captured the essence of our day in ways we couldn't have imagined. Every time we look at them, we're transported right back to those moments.",
    name: 'Sarah & James',
    event: 'Wedding, 2025',
  },
  {
    quote: "Professional, discreet, and incredibly talented. The corporate event photos were used across all our marketing channels — they were that good.",
    name: 'Michael Chen',
    event: 'Corporate Gala, 2025',
  },
  {
    quote: "You have an extraordinary gift for making people feel at ease. The candid shots are my absolute favourites.",
    name: 'Emma Rodriguez',
    event: 'Birthday Celebration, 2024',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/hero.png"
            alt="Wedding ceremony at sunset"
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Capturing moments
            <br />
            <em>
              <AnimatedText text="that matter" delay={800} speed={80} />
            </em>
          </h1>
          <p className={styles.heroSubtitle}>EVENT PHOTOGRAPHY</p>
          <div className={styles.heroScroll}>
            <span>Scroll</span>
            <div className={styles.heroScrollLine} />
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className={`section ${styles.intro}`}>
        <div className="container-narrow">
          <ScrollReveal>
            <p className={styles.introLabel}>WELCOME</p>
            <h2 className={styles.introTitle}>
              It&apos;s Lovely To <em>See You Here</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className={styles.introText}>
              Within these walls you will find a curated selection of event photography —
              from intimate celebrations to grand corporate affairs. Each image tells a story,
              each moment preserved with intention and artistry.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className={styles.introText}>
              My aim is to provide you with honest, emotive photographs that capture not just
              what happened, but how it felt. If this approach speaks to you, I would be
              honoured to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Work */}
      <section className={`section ${styles.featured}`}>
        <div className="container-wide">
          <ScrollReveal>
            <p className={styles.sectionLabel}>SELECTED WORK</p>
            <h2 className={styles.sectionTitle}>
              Featured <em>Portfolio</em>
            </h2>
          </ScrollReveal>

          <div className={styles.featuredGrid}>
            {featuredWork.map((item, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <Link href="/portfolio" className={styles.featuredItem}>
                  <div className={styles.featuredImageWrapper}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className={styles.featuredOverlay}>
                      <span className={styles.featuredCategory}>{item.category}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className={styles.featuredCta}>
              <Link href="/portfolio" className="btn">
                View Full Portfolio
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section ${styles.testimonials}`}>
        <div className="container">
          <ScrollReveal>
            <p className={styles.sectionLabel}>KIND WORDS</p>
            <h2 className={styles.sectionTitle}>
              What Clients <em>Say</em>
            </h2>
          </ScrollReveal>

          <div className={styles.testimonialGrid}>
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className={styles.testimonialCard}>
                  <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
                  <div className={styles.testimonialAuthor}>
                    <span className={styles.testimonialName}>{t.name}</span>
                    <span className={styles.testimonialEvent}>{t.event}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <ScrollReveal>
            <p className={styles.sectionLabel}>READY?</p>
            <h2 className={styles.ctaTitle}>
              Let&apos;s Create Something <em>Beautiful</em>
            </h2>
            <p className={styles.ctaText}>
              Every event has a story waiting to be told. Let me help you tell yours.
            </p>
            <Link href="/contact" className="btn btn-accent btn-lg" id="home-cta">
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
