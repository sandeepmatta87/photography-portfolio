'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

interface Quote {
  id: string;
  name: string;
  email: string;
  eventType: string;
  status: string;
  createdAt: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  total: number;
  status: string;
  type: string;
  createdAt: string;
}

interface Payment {
  id: string;
  amount: number;
  paidAt: string;
  clientName: string;
}

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/quotes').then(r => r.json()),
      fetch('/api/invoices').then(r => r.json()),
      fetch('/api/payments').then(r => r.json()),
    ]).then(([q, i, p]) => {
      setQuotes(Array.isArray(q) ? q : []);
      setInvoices(Array.isArray(i) ? i : []);
      setPayments(Array.isArray(p) ? p : []);
    }).catch(console.error);
  }, []);

  const newQuotes = quotes.filter(q => q.status === 'new').length;
  const pendingInvoices = invoices.filter(i => i.status === 'sent' || i.status === 'draft').length;
  const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className={styles.pageTitle}>
        Dashboard
      </h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>New Quotes</span>
          <span className={styles.statValue}>{newQuotes}</span>
          <span className={styles.statSub}>{quotes.length} total</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Pending Invoices</span>
          <span className={styles.statValue}>{pendingInvoices}</span>
          <span className={styles.statSub}>{invoices.length} total</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Overdue</span>
          <span className={styles.statValue} style={{ color: overdueInvoices > 0 ? 'var(--color-danger)' : undefined }}>
            {overdueInvoices}
          </span>
          <span className={styles.statSub}>need attention</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Revenue</span>
          <span className={styles.statValue}>${totalRevenue.toLocaleString()}</span>
          <span className={styles.statSub}>total collected</span>
        </div>
      </div>

      {/* Recent Quotes */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Recent Quote Requests</h2>
        <Link href="/admin/quotes" className="btn btn-sm">View All</Link>
      </div>
      <div className={styles.tableCard}>
        {quotes.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No quote requests yet. They&apos;ll appear here when clients submit enquiries.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Event</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {quotes.slice(0, 5).map(q => (
                <tr key={q.id}>
                  <td>{q.name}</td>
                  <td>{q.eventType}</td>
                  <td>
                    <span className={`badge ${q.status === 'new' ? 'badge-info' : q.status === 'responded' ? 'badge-success' : 'badge-neutral'}`}>
                      {q.status}
                    </span>
                  </td>
                  <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ height: 'var(--space-2xl)' }} />

      {/* Recent Invoices */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Recent Invoices</h2>
        <Link href="/admin/invoices" className="btn btn-sm">View All</Link>
      </div>
      <div className={styles.tableCard}>
        {invoices.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No invoices created yet. Create your first invoice from the Invoices page.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Client</th>
                <th>Type</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 5).map(inv => (
                <tr key={inv.id}>
                  <td>{inv.invoiceNumber}</td>
                  <td>{inv.clientName}</td>
                  <td>
                    <span className={`badge ${inv.type === 'booking' ? 'badge-info' : 'badge-neutral'}`}>
                      {inv.type}
                    </span>
                  </td>
                  <td>${inv.total.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${
                      inv.status === 'paid' ? 'badge-success' :
                      inv.status === 'sent' ? 'badge-warning' :
                      inv.status === 'overdue' ? 'badge-danger' : 'badge-neutral'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
