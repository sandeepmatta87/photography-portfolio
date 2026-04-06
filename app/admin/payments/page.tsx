'use client';

import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  method: string;
  reference: string;
  paidAt: string;
  notes: string;
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    fetch('/api/payments')
      .then(r => r.json())
      .then(data => setPayments(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const thisMonth = payments.filter(p => {
    const d = new Date(p.paidAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const thisMonthRevenue = thisMonth.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className={styles.pageTitle}>Payment Tracking</h1>

      <div className={styles.statsGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Revenue</span>
          <span className={styles.statValue}>${totalRevenue.toLocaleString()}</span>
          <span className={styles.statSub}>{payments.length} payments</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>This Month</span>
          <span className={styles.statValue}>${thisMonthRevenue.toLocaleString()}</span>
          <span className={styles.statSub}>{thisMonth.length} payments</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Average Payment</span>
          <span className={styles.statValue}>
            ${payments.length > 0 ? (totalRevenue / payments.length).toFixed(0) : '0'}
          </span>
          <span className={styles.statSub}>per transaction</span>
        </div>
      </div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Payment History</h2>
      </div>

      <div className={styles.tableCard}>
        {payments.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No payments recorded yet. Payments will appear here when you record them against invoices.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td>{new Date(p.paidAt).toLocaleDateString()}</td>
                  <td><strong>{p.invoiceNumber}</strong></td>
                  <td>{p.clientName}</td>
                  <td style={{ color: 'var(--color-success)', fontWeight: 500 }}>
                    ${p.amount.toFixed(2)}
                  </td>
                  <td>
                    <span className="badge badge-neutral">{p.method.replace('_', ' ')}</span>
                  </td>
                  <td style={{ color: 'var(--color-text-light)' }}>{p.reference || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
