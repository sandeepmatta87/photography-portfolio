'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';

interface InvoiceItem {
  description: string;
  qty: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  type: string;
  items: string;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  dueDate: string;
  notes: string;
  createdAt: string;
}

const statusFilters = ['all', 'draft', 'sent', 'paid', 'overdue'];

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);

  // Create form state
  const [form, setForm] = useState({
    clientName: '', clientEmail: '', clientPhone: '',
    type: 'booking' as 'booking' | 'service',
    items: [{ description: 'Booking Fee', qty: 1, amount: 300 }] as InvoiceItem[],
    dueDate: '', notes: '',
  });

  const fetchInvoices = () => {
    fetch('/api/invoices').then(r => r.json()).then(data => {
      setInvoices(Array.isArray(data) ? data : []);
    }).catch(console.error);
  };

  useEffect(() => { fetchInvoices(); }, []);

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter);

  const addItem = () => {
    setForm(prev => ({
      ...prev,
      items: [...prev.items, { description: '', qty: 1, amount: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const subtotal = form.items.reduce((sum, item) => sum + (item.amount * item.qty), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setShowCreate(false);
      setForm({
        clientName: '', clientEmail: '', clientPhone: '',
        type: 'booking', items: [{ description: 'Booking Fee', qty: 1, amount: 300 }],
        dueDate: '', notes: '',
      });
      fetchInvoices();
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/invoices/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchInvoices();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Invoices</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(true)} id="create-invoice-btn">
          + New Invoice
        </button>
      </div>

      <div className={styles.filterBar}>
        {statusFilters.map(s => (
          <button
            key={s}
            className={`${styles.filterChip} ${filter === s ? styles.filterChipActive : ''}`}
            onClick={() => setFilter(s)}
          >
            {s} {s !== 'all' ? `(${invoices.filter(i => i.status === s).length})` : `(${invoices.length})`}
          </button>
        ))}
      </div>

      <div className={styles.tableCard}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No invoices found. Create your first one!</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Type</th>
                <th>Total</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id}>
                  <td><strong>{inv.invoiceNumber}</strong></td>
                  <td>{inv.clientName}</td>
                  <td>
                    <span className={`badge ${inv.type === 'booking' ? 'badge-info' : 'badge-neutral'}`}>
                      {inv.type}
                    </span>
                  </td>
                  <td>${inv.total.toLocaleString()}</td>
                  <td>{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '—'}</td>
                  <td>
                    <span className={`badge ${
                      inv.status === 'paid' ? 'badge-success' :
                      inv.status === 'sent' ? 'badge-warning' :
                      inv.status === 'overdue' ? 'badge-danger' : 'badge-neutral'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '4px' }}>
                    <Link href={`/admin/invoices/${inv.id}`} className={styles.actionBtn}>
                      View
                    </Link>
                    {inv.status === 'draft' && (
                      <button className={styles.actionBtn} onClick={() => updateStatus(inv.id, 'sent')}>
                        Send
                      </button>
                    )}
                    {inv.status === 'sent' && (
                      <button className={styles.actionBtn} onClick={() => updateStatus(inv.id, 'paid')}>
                        Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Invoice Modal */}
      {showCreate && (
        <div className={styles.modalOverlay} onClick={() => setShowCreate(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <h2 className={styles.modalTitle}>Create New Invoice</h2>
            <form onSubmit={handleCreate}>
              <div className={styles.inlineRow}>
                <div className="form-group">
                  <label className="form-label">Client Name</label>
                  <input type="text" className="form-input" required
                    value={form.clientName} onChange={e => setForm(prev => ({ ...prev, clientName: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Client Email</label>
                  <input type="email" className="form-input" required
                    value={form.clientEmail} onChange={e => setForm(prev => ({ ...prev, clientEmail: e.target.value }))} />
                </div>
              </div>

              <div className={styles.inlineRow}>
                <div className="form-group">
                  <label className="form-label">Invoice Type</label>
                  <select className="form-select" value={form.type}
                    onChange={e => setForm(prev => ({ ...prev, type: e.target.value as 'booking' | 'service' }))}>
                    <option value="booking">Booking Fee</option>
                    <option value="service">Service Fee</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-input"
                    value={form.dueDate} onChange={e => setForm(prev => ({ ...prev, dueDate: e.target.value }))} />
                </div>
              </div>

              <label className="form-label">Line Items</label>
              {form.items.map((item, i) => (
                <div key={i} className={styles.itemRow}>
                  <input type="text" className="form-input" placeholder="Description" required
                    value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} />
                  <input type="number" className="form-input" placeholder="Qty" min="1"
                    value={item.qty} onChange={e => updateItem(i, 'qty', parseInt(e.target.value) || 1)} />
                  <input type="number" className="form-input" placeholder="Amount" min="0" step="0.01"
                    value={item.amount} onChange={e => updateItem(i, 'amount', parseFloat(e.target.value) || 0)} />
                  {form.items.length > 1 && (
                    <button type="button" className={styles.removeBtn} onClick={() => removeItem(i)}>×</button>
                  )}
                </div>
              ))}
              <button type="button" className={styles.addItemBtn} onClick={addItem}>
                + Add Line Item
              </button>

              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>GST (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.totalRowFinal}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 'var(--space-lg)' }}>
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" rows={3}
                  value={form.notes} onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Payment terms, bank details, special instructions..." />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className="btn btn-sm" onClick={() => setShowCreate(false)}>Cancel</button>
                <button type="submit" className="btn btn-sm btn-primary" id="save-invoice-btn">Create Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
