'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '◉' },
  { href: '/admin/quotes', label: 'Quotes', icon: '✉' },
  { href: '/admin/invoices', label: 'Invoices', icon: '◧' },
  { href: '/admin/payments', label: 'Payments', icon: '$' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_auth');
    if (stored === 'true') setAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password gate – in production use proper auth
    if (password === 'admin123') {
      setAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  if (!authenticated) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginCard}>
          <div className={styles.loginBrand}>
            <span className={styles.loginBrandName}>S M</span>
            <span className={styles.loginBrandSub}>A D M I N</span>
          </div>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="form-input"
              id="admin-password"
              autoFocus
            />
            {error && <p className={styles.loginError}>{error}</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} id="admin-login">
              Access Dashboard
            </button>
            <p className={styles.loginHint}>Default: admin123</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.admin}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? '' : styles.sidebarCollapsed}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.sidebarBrand}>
            <span>S M</span>
            {sidebarOpen && <span className={styles.sidebarBrandSub}>Admin</span>}
          </Link>
          <button
            className={styles.sidebarToggle}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? '◁' : '▷'}
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.sidebarLink} ${pathname === item.href ? styles.sidebarLinkActive : ''}`}
              id={`admin-nav-${item.label.toLowerCase()}`}
            >
              <span className={styles.sidebarIcon}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.sidebarLink}>
            <span className={styles.sidebarIcon}>←</span>
            {sidebarOpen && <span>Back to Site</span>}
          </Link>
          <button
            className={styles.sidebarLink}
            onClick={() => {
              sessionStorage.removeItem('admin_auth');
              setAuthenticated(false);
            }}
            id="admin-logout"
          >
            <span className={styles.sidebarIcon}>⏻</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
