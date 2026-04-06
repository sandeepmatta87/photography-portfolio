import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './page.module.css';

export const metadata = {
  title: 'Services & Pricing | SM Photography',
  description: 'Explore our event photography packages. From intimate gatherings to grand celebrations — find the perfect package for your event.',
};

const packages = [
  {
    name: 'Essential',
    price: '$1,200',
    description: 'Perfect for intimate gatherings and smaller events.',
    features: [
      'Up to 3 hours of coverage',
      '100+ edited digital images',
      'Online gallery for sharing',
      'Print-ready high resolution',
      '2 week turnaround',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: '$2,500',
    description: 'Our most popular package for weddings and celebrations.',
    features: [
      'Up to 6 hours of coverage',
      '300+ edited digital images',
      'Online gallery + USB delivery',
      'Print-ready high resolution',
      'Second shooter included',
      'Engagement / Pre-event session',
      '1 week turnaround',
    ],
    popular: true,
  },
  {
    name: 'Luxury',
    price: '$4,500',
    description: 'The complete experience for those who want everything.',
    features: [
      'Full day coverage (up to 12 hours)',
      '500+ edited digital images',
      'Premium leather-bound album',
      'Online gallery + USB delivery',
      'Second shooter included',
      'Engagement / Pre-event session',
      'Same-day preview images',
      'Priority turnaround',
    ],
    popular: false,
  },
];

export default function Services() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className={styles.label}>SERVICES</p>
            <h1 className={styles.title}>
              The <em>Experience</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section ${styles.experience}`}>
        <div className="container-wide">
          <div className={styles.experienceGrid}>
            <div className={styles.experienceImage}>
              <ScrollReveal>
                <div className={styles.imageFrame}>
                  <Image
                    src="/images/wedding.png"
                    alt="Event photography in action"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </ScrollReveal>
            </div>
            <div className={styles.experienceContent}>
              <ScrollReveal delay={200}>
                <p className={styles.experienceText}>
                  There is nothing quite like the energy of a room full of people celebrating
                  something meaningful. Whether it&apos;s the quiet exchange of vows, the eruption
                  of a dance floor, or the tearful toast of a proud parent — these are the moments
                  that define us.
                </p>
                <p className={styles.experienceText}>
                  This is why photography, and your experience, is so important. It&apos;s an
                  opportunity to capture the beauty of these precious occasions and preserve them
                  for a lifetime.
                </p>
                <p className={styles.experienceText}>
                  Every event photographed is approached with care, intention, and a commitment
                  to capturing the authentic emotion of your celebration. From the first consultation
                  to the final gallery delivery, the experience is designed to be seamless,
                  enjoyable, and entirely focused on you.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.pricing}`}>
        <div className="container">
          <ScrollReveal>
            <p className={styles.label} style={{ textAlign: 'center' }}>INVESTMENT</p>
            <h2 className={styles.pricingTitle}>
              Choose Your <em>Package</em>
            </h2>
          </ScrollReveal>

          <div className={styles.packageGrid}>
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 150}>
                <div className={`${styles.packageCard} ${pkg.popular ? styles.packagePopular : ''}`}>
                  {pkg.popular && <span className={styles.popularBadge}>Most Popular</span>}
                  <h3 className={styles.packageName}>{pkg.name}</h3>
                  <p className={styles.packagePrice}>
                    <span className={styles.priceFrom}>from</span>
                    {pkg.price}
                  </p>
                  <p className={styles.packageDesc}>{pkg.description}</p>
                  <div className="divider" />
                  <ul className={styles.packageFeatures}>
                    {pkg.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`btn ${pkg.popular ? 'btn-accent' : ''}`}
                    style={{ width: '100%' }}
                    id={`package-${pkg.name.toLowerCase()}-cta`}
                  >
                    Request Quote
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.booking}`}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className={styles.label}>BOOKING</p>
            <h2 style={{ marginBottom: 'var(--space-xl)' }}>
              How It <em>Works</em>
            </h2>
            <p className={styles.bookingText}>
              To reserve your date, a non-refundable booking fee of <strong>$300</strong> is
              required along with a signed agreement. This fee is deducted from your final
              package price. The remaining balance is due 7 days before the event.
            </p>
            <p className={styles.bookingText}>
              For corporate clients and larger events, custom packages are available.
              Please reach out to discuss your specific requirements.
            </p>
            <Link href="/contact" className="btn btn-primary" id="services-cta">
              Let&apos;s Discuss Your Event
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
