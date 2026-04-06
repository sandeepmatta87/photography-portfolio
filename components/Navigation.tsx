'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (isAdmin) return null;

  const isHome = pathname === '/';

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${isHome && !scrolled ? styles.transparent : ''}`}>
        <button
          className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          id="nav-toggle"
        >
          <span />
          <span />
          <span />
        </button>

        <Link href="/" className={styles.logo} id="nav-logo">
          <span className={styles.logoText}>S M</span>
          <span className={styles.logoDivider} />
          <span className={styles.logoSub}>P H O T O G R A P H Y</span>
        </Link>

        <Link href="/contact" className={styles.headerCta} id="nav-contact-btn">
          Let&apos;s Connect
        </Link>
      </header>

      <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}>
        <nav className={styles.nav}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''}`}
              style={{ transitionDelay: isOpen ? `${0.1 + i * 0.08}s` : '0s' }}
              id={`nav-link-${link.label.toLowerCase()}`}
            >
              <span className={styles.navNumber}>0{i + 1}</span>
              <span className={styles.navLabel}>{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.overlayFooter}>
          <a href="mailto:hello@smphotography.com" className={styles.overlayEmail}>
            hello@smphotography.com
          </a>
          <div className={styles.overlaySocial}>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Pinterest">Pinterest</a>
          </div>
        </div>
      </div>
    </>
  );
}
