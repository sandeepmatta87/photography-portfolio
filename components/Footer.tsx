'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* Column 1: CTA */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>
            Let&apos;s <em>Connect</em>
          </h3>
          <p className={styles.colText}>
            Ready to capture your next event? I&apos;d love to hear your story
            and create something beautiful together.
          </p>
          <Link href="/contact" className="btn" id="footer-cta">
            Request a Quote
          </Link>
        </div>

        {/* Column 2: Brand */}
        <div className={`${styles.col} ${styles.colCenter}`}>
          <div className={styles.brand}>
            <span className={styles.brandName}>S M</span>
            <span className={styles.brandDivider} />
            <span className={styles.brandSub}>P H O T O G R A P H Y</span>
          </div>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Pinterest" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 5.97 9.12-.08-.72-.16-1.84.03-2.63.17-.71 1.12-4.73 1.12-4.73s-.28-.57-.28-1.41c0-1.32.77-2.31 1.72-2.31.81 0 1.2.61 1.2 1.34 0 .81-.52 2.03-.79 3.16-.22.95.47 1.72 1.41 1.72 1.69 0 2.99-1.78 2.99-4.36 0-2.28-1.63-3.87-3.97-3.87-2.7 0-4.29 2.03-4.29 4.12 0 .82.31 1.69.71 2.17.08.09.09.18.07.27-.07.3-.24.95-.27 1.08-.04.18-.14.22-.33.13-1.23-.57-2-2.37-2-3.81 0-3.1 2.25-5.94 6.49-5.94 3.41 0 6.05 2.43 6.05 5.67 0 3.38-2.13 6.11-5.09 6.11-1 0-1.93-.52-2.25-1.13l-.61 2.34c-.22.86-.82 1.93-1.22 2.58.92.28 1.89.44 2.91.44 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 3: Directory */}
        <div className={`${styles.col} ${styles.colRight}`}>
          <h4 className={styles.dirTitle}>Directory</h4>
          <nav className={styles.dirNav}>
            <Link href="/">Home</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} SM Photography. All rights reserved.</p>
        <p>Crafted with passion</p>
      </div>
    </footer>
  );
}
