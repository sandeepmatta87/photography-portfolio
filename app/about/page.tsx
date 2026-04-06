import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './page.module.css';

export const metadata = {
  title: 'About | SM Photography',
  description: 'Learn about SM Photography — the story, the approach, and the passion behind capturing your most important moments.',
};

export default function About() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className={styles.label}>THE STORY</p>
            <h1 className={styles.title}>
              About <em>Me</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section ${styles.story}`}>
        <div className="container-wide">
          <div className={styles.storyGrid}>
            <div className={styles.storyImage}>
              <ScrollReveal>
                <div className={styles.imageFrame}>
                  <Image
                    src="/images/hero.png"
                    alt="Photographer at work"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </ScrollReveal>
            </div>
            <div className={styles.storyContent}>
              <ScrollReveal delay={200}>
                <h2 className={styles.storyTitle}>
                  The <em>Journey</em>
                </h2>
                <div className="divider" />
                <p className={styles.storyText}>
                  Photography found me, not the other way around. What began as a quiet curiosity
                  with a borrowed camera at a friend&apos;s wedding has grown into a deep passion
                  for storytelling through imagery.
                </p>
                <p className={styles.storyText}>
                  Over the years, I&apos;ve had the privilege of documenting hundreds of events —
                  from intimate family celebrations to large-scale corporate affairs. Each one
                  has taught me something new about people, light, and the extraordinary beauty
                  that lives in ordinary moments.
                </p>
                <p className={styles.storyText}>
                  My approach is simple: be present, be patient, and let the story unfold
                  naturally. I believe the best photographs are the ones you didn&apos;t know
                  were being taken.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.approach}`}>
        <div className="container">
          <ScrollReveal>
            <p className={styles.label} style={{ textAlign: 'center' }}>MY APPROACH</p>
            <h2 className={styles.approachTitle}>
              How I <em>Work</em>
            </h2>
          </ScrollReveal>

          <div className={styles.approachGrid}>
            {[
              {
                number: '01',
                title: 'Observe',
                text: 'I begin by understanding your event — the atmosphere, the key moments, and what matters most to you. Every event has its own rhythm.',
              },
              {
                number: '02',
                title: 'Capture',
                text: 'During the event, I work quietly and unobtrusively. My goal is to be invisible, capturing authentic moments as they naturally unfold.',
              },
              {
                number: '03',
                title: 'Craft',
                text: 'After the event, each image is carefully selected and processed. I focus on timeless, editorial-quality results that will stand the test of time.',
              },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className={styles.approachCard}>
                  <span className={styles.approachNumber}>{step.number}</span>
                  <h3 className={styles.approachCardTitle}>{step.title}</h3>
                  <p className={styles.approachCardText}>{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.equipment}`}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className={styles.label}>GEAR</p>
            <h2 style={{ marginBottom: 'var(--space-xl)' }}>
              The <em>Tools</em>
            </h2>
            <p className={styles.equipText}>
              I shoot with professional-grade equipment chosen for reliability, low-light performance,
              and the ability to capture fleeting moments with precision. While the camera is just a tool,
              a good craftsman respects their instruments.
            </p>
            <div className={styles.equipList}>
              <span>Sony Alpha Series</span>
              <span className={styles.equipDot}>·</span>
              <span>Prime Lenses</span>
              <span className={styles.equipDot}>·</span>
              <span>Natural Light Priority</span>
              <span className={styles.equipDot}>·</span>
              <span>Dual Card Backup</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
