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
    quote: "Our session with you was more than just showing up to get 'photos' — it was like emotional therapy for us. The photos are a captured moment of our joy, pride, love, wonder and amazement.",
    name: 'Sarah & James',
    event: 'Wedding, 2025',
  },
  {
    quote: "Professional, discreet, and incredibly talented. The corporate event photos were used across all our marketing channels — they were that good.",
    name: 'Michael Chen',
    event: 'Corporate Gala, 2025',
  },
  {
    quote: "I've never been made to feel so beautiful and at ease. You have an extraordinary gift for making people feel comfortable. The candid shots are my absolute favourites.",
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
            Honest portraiture for
            <br />
            <em>
              <AnimatedText text="your story" delay={800} speed={80} />
            </em>
          </h1>
          <p className={styles.heroSubtitle}>EVENT PHOTOGRAPHY</p>
          <div className={styles.heroScroll}>
            <span>Scroll</span>
            <div className={styles.heroScrollLine} />
          </div>
        </div>
      </section>

      {/* Intro Section — Asymmetric Editorial Layout */}
      <section className={styles.intro}>
        <div className={styles.introLayout}>
          <div className={styles.introLeft}>
            <ScrollReveal>
              <p className={styles.introText}>
                SM Photography specialises in capturing
                the soul of your most meaningful events.
              </p>
              <p className={styles.introText}>
                As an event photographer, I preserve pure and honest moments
                that will be cherished for generations.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <blockquote className={styles.introQuote}>
                <span className={styles.quoteMarks}>&ldquo;</span>
                <em>For lovers of images that are timeless, authentic and full of soul — just as they should be.</em>
              </blockquote>
            </ScrollReveal>
          </div>
          <div className={styles.introRight}>
            <ScrollReveal delay={200}>
              <div className={styles.introImages}>
                <div className={styles.introImg1}>
                  <Image
                    src="/images/wedding.png"
                    alt="Elegant first dance"
                    width={400}
                    height={530}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
                <div className={styles.introImg2}>
                  <Image
                    src="/images/birthday.png"
                    alt="Joyful celebration"
                    width={350}
                    height={470}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.story}>
        <div className={styles.storyLayout}>
          <ScrollReveal>
            <div className={styles.storyImage}>
              <Image
                src="/images/hero.png"
                alt="Capturing the moment"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className={styles.storyContent}>
              <h2 className={styles.storyTitle}>
                Your Story Is Worth
                <br />
                <em>Being Told.</em>
              </h2>
              <p className={styles.storyText}>
                Event photography is a delicate dance with time, freezing memories
                that linger forever in the heart. There is an art to preserving a moment
                in its purest form — and here, this art form has been mastered.
              </p>
              <p className={styles.storyText}>
                Through your photographs, a tiny piece of the present is woven
                into the tapestry of the future. With meticulous care and an eye
                for authenticity, I create photographs that reflect the uniqueness
                of your legacy.
              </p>
              <Link href="/about" className={styles.storyLink}>
                More Info
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials — Flowing Carousel Style */}
      <section className={styles.testimonials}>
        <div className={styles.testimonialFlow}>
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 200}>
              <div className={styles.testimonialItem}>
                <h4 className={styles.testimonialQuote}>
                  &ldquo;{t.quote}&rdquo;
                </h4>
                <p className={styles.testimonialText}>
                  {t.quote.length > 100 ? t.quote.substring(0, 100) + '...' : ''}
                </p>
                <div className={styles.testimonialDash} />
                <span className={styles.testimonialAuthor}>{t.name}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services Pillars */}
      <section className={styles.pillars}>
        <div className="container-wide">
          <div className={styles.pillarGrid}>
            <ScrollReveal>
              <div className={styles.pillar}>
                <h3>Evocative Storytelling that Transcends Time</h3>
                <p>Through keen artistic sensibility, I intertwine the threads of emotion, light, and composition, creating visual narratives that resonate deeply.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className={styles.pillar}>
                <h3>Unparalleled Mastery of Authenticity</h3>
                <p>Capturing unfiltered emotions and intimate moments with acute sensitivity, unveiling the intricacies of human connection.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className={styles.pillar}>
                <h3>Exceptional Client Experience</h3>
                <p>With genuine care and an unwavering commitment to exceeding expectations, the resulting photography experience becomes transformative.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Work — Asymmetric Grid */}
      <section className={styles.featured}>
        <div className="container-wide">
          <div className={styles.featuredGrid}>
            {featuredWork.map((item, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <Link href="/portfolio" className={`${styles.featuredItem} ${styles[`featuredItem${i + 1}`]}`}>
                  <div className={styles.featuredImageWrapper}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <div className={styles.featuredMeta}>
                    <h3>{item.category}</h3>
                    <span className={styles.featuredLink}>{item.category}</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Quote */}
      <section className={styles.signature}>
        <div className="container-narrow">
          <ScrollReveal>
            <p className={styles.signatureText}>
              <em>… and they are beautiful, in the very skin that is them.</em>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <ScrollReveal>
            <h2 className={styles.ctaTitle}>Let&apos;s <em>Connect</em></h2>
            <p className={styles.ctaText}>
              Event photography based in Melbourne, Australia.
            </p>
            <Link href="/contact" className="btn" id="home-cta">
              Contact
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
