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

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <nav className={styles.nav}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''}`}
              style={{ transitionDelay: isOpen ? `${0.1 + i * 0.06}s` : '0s' }}
              id={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarDivider} />
          <a href="mailto:hello@smphotography.com" className={styles.sidebarEmail}>
            hello@smphotography.com
          </a>
          <div className={styles.sidebarSocial}>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Pinterest">Pinterest</a>
          </div>
        </div>
      </div>
    </>
  );
}
