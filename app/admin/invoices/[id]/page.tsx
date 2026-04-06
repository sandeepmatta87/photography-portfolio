'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import styles from '../../admin.module.css';

interface InvoiceItem {
  description: string;
  qty: number;
  amount: number;
}

interface Payment {
  id: string;
  amount: number;
  method: string;
  reference: string;
  paidAt: string;
  notes: string;
}

interface InvoiceDetail {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  type: string;
  items: string;
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
  status: string;
  dueDate: string;
  notes: string;
  createdAt: string;
  payments: Payment[];
}

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: 0, method: 'bank_transfer', reference: '', notes: '',
  });

  const fetchInvoice = () => {
    fetch(`/api/invoices/${id}`)
      .then(r => r.json())
      .then(setInvoice)
      .catch(console.error);
  };

  useEffect(() => { fetchInvoice(); }, [id]);

  if (!invoice) {
    return <div className={styles.emptyState}><p>Loading...</p></div>;
  }

  const items: InvoiceItem[] = JSON.parse(invoice.items);
  const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
  const balance = invoice.total - totalPaid;

  const updateStatus = async (status: string) => {
    await fetch(`/api/invoices/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchInvoice();
  };

  const recordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId: id, ...paymentForm }),
    });
    setShowPayment(false);
    setPaymentForm({ amount: 0, method: 'bank_transfer', reference: '', notes: '' });
    fetchInvoice();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <Link href="/admin/invoices" style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
            ← Back to Invoices
          </Link>
          <h1 className={styles.pageTitle} style={{ marginTop: 'var(--space-sm)' }}>
            {invoice.invoiceNumber}
          </h1>
        </div>
        <div className={styles.headerActions}>
          <span className={`badge ${
            invoice.status === 'paid' ? 'badge-success' :
            invoice.status === 'sent' ? 'badge-warning' :
            invoice.status === 'overdue' ? 'badge-danger' : 'badge-neutral'
          }`} style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
            {invoice.status.toUpperCase()}
          </span>
          {invoice.status === 'draft' && (
            <button className="btn btn-sm" onClick={() => updateStatus('sent')}>Mark as Sent</button>
          )}
          {invoice.status !== 'paid' && (
            <button className="btn btn-sm btn-accent" onClick={() => {
              setPaymentForm(prev => ({ ...prev, amount: balance }));
              setShowPayment(true);
            }}>
              Record Payment
            </button>
          )}
        </div>
      </div>

      {/* Invoice Preview */}
      <div style={{ background: 'white', border: '1px solid var(--color-border-light)', padding: 'var(--space-3xl)', maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3xl)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', letterSpacing: '0.3em' }}>S M</div>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.3em', color: 'var(--color-text-light)' }}>P H O T O G R A P H Y</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 300, color: 'var(--color-text-light)' }}>INVOICE</div>
            <div style={{ fontSize: '0.85rem', marginTop: 'var(--space-sm)' }}>{invoice.invoiceNumber}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
              {new Date(invoice.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)', marginBottom: 'var(--space-2xl)' }}>
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)' }}>Bill To</div>
            <div style={{ fontFamily: 'var(--font-elegant)', fontSize: '1.1rem' }}>{invoice.clientName}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{invoice.clientEmail}</div>
            {invoice.clientPhone && <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{invoice.clientPhone}</div>}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)' }}>Details</div>
            <div style={{ fontSize: '0.85rem' }}>
              Type: <span className={`badge ${invoice.type === 'booking' ? 'badge-info' : 'badge-neutral'}`}>{invoice.type}</span>
            </div>
            {invoice.dueDate && (
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
                Due: {new Date(invoice.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Line Items */}
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th style={{ textAlign: 'center' }}>Qty</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.description}</td>
                <td style={{ textAlign: 'center' }}>{item.qty}</td>
                <td style={{ textAlign: 'right' }}>${item.amount.toFixed(2)}</td>
                <td style={{ textAlign: 'right' }}>${(item.qty * item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.totals} style={{ marginTop: 'var(--space-xl)' }}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>${invoice.subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>GST ({invoice.taxRate}%)</span>
            <span>${invoice.tax.toFixed(2)}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.totalRowFinal}`}>
            <span>Total</span>
            <span>${invoice.total.toFixed(2)}</span>
          </div>
          {totalPaid > 0 && (
            <>
              <div className={styles.totalRow} style={{ color: 'var(--color-success)' }}>
                <span>Paid</span>
                <span>-${totalPaid.toFixed(2)}</span>
              </div>
              <div className={`${styles.totalRow} ${styles.totalRowFinal}`}>
                <span>Balance</span>
                <span>${balance.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {invoice.notes && (
          <div style={{ marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--color-border-light)' }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)' }}>Notes</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', whiteSpace: 'pre-wrap' as const }}>{invoice.notes}</p>
          </div>
        )}
      </div>

      {/* Payment History */}
      {invoice.payments.length > 0 && (
        <div style={{ marginTop: 'var(--space-2xl)' }}>
          <h3 className={styles.sectionTitle}>Payment History</h3>
          <div className={styles.tableCard} style={{ marginTop: 'var(--space-lg)' }}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Reference</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {invoice.payments.map(p => (
                  <tr key={p.id}>
                    <td>{new Date(p.paidAt).toLocaleDateString()}</td>
                    <td><strong>${p.amount.toFixed(2)}</strong></td>
                    <td>{p.method.replace('_', ' ')}</td>
                    <td>{p.reference || '—'}</td>
                    <td>{p.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showPayment && (
        <div className={styles.modalOverlay} onClick={() => setShowPayment(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Record Payment</h2>
            <form onSubmit={recordPayment}>
              <div className={styles.inlineRow}>
                <div className="form-group">
                  <label className="form-label">Amount</label>
                  <input type="number" className="form-input" required step="0.01" min="0"
                    value={paymentForm.amount} onChange={e => setPaymentForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Method</label>
                  <select className="form-select" value={paymentForm.method}
                    onChange={e => setPaymentForm(prev => ({ ...prev, method: e.target.value }))}>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Reference</label>
                <input type="text" className="form-input" placeholder="Transaction reference"
                  value={paymentForm.reference} onChange={e => setPaymentForm(prev => ({ ...prev, reference: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" rows={2}
                  value={paymentForm.notes} onChange={e => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))} />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className="btn btn-sm" onClick={() => setShowPayment(false)}>Cancel</button>
                <button type="submit" className="btn btn-sm btn-primary">Record Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
