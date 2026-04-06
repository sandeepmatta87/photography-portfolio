'use client';

import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  venue: string;
  guests: string;
  message: string;
  status: string;
  createdAt: string;
}

const statuses = ['all', 'new', 'responded', 'converted', 'declined'];

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Quote | null>(null);

  const fetchQuotes = () => {
    fetch('/api/quotes').then(r => r.json()).then(data => {
      setQuotes(Array.isArray(data) ? data : []);
    }).catch(console.error);
  };

  useEffect(() => { fetchQuotes(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/quotes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchQuotes();
    if (selected?.id === id) {
      setSelected(prev => prev ? { ...prev, status } : null);
    }
  };

  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.status === filter);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Quote Requests</h1>
      </div>

      <div className={styles.filterBar}>
        {statuses.map(s => (
          <button
            key={s}
            className={`${styles.filterChip} ${filter === s ? styles.filterChipActive : ''}`}
            onClick={() => setFilter(s)}
          >
            {s} {s !== 'all' ? `(${quotes.filter(q => q.status === s).length})` : `(${quotes.length})`}
          </button>
        ))}
      </div>

      <div className={styles.tableCard}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No quotes found.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Date</th>
                <th>Status</th>
                <th>Received</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => (
                <tr key={q.id}>
                  <td><strong>{q.name}</strong></td>
                  <td>{q.email}</td>
                  <td>{q.eventType}</td>
                  <td>{q.eventDate || '—'}</td>
                  <td>
                    <span className={`badge ${
                      q.status === 'new' ? 'badge-info' :
                      q.status === 'responded' ? 'badge-success' :
                      q.status === 'converted' ? 'badge-warning' : 'badge-neutral'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                  <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className={styles.actionBtn} onClick={() => setSelected(q)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quote Detail Modal */}
      {selected && (
        <div className={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Quote from {selected.name}</h2>

            <div className={styles.quoteDetail}>
              <div className={styles.quoteField}>
                <span className={styles.fieldLabel}>Name</span>
                <span className={styles.fieldValue}>{selected.name}</span>
              </div>
              <div className={styles.quoteField}>
                <span className={styles.fieldLabel}>Email</span>
                <span className={styles.fieldValue}>{selected.email}</span>
              </div>
              <div className={styles.quoteField}>
                <span className={styles.fieldLabel}>Phone</span>
                <span className={styles.fieldValue}>{selected.phone || '—'}</span>
              </div>
              <div className={styles.quoteField}>
                <span className={styles.fieldLabel}>Event Type</span>
                <span className={styles.fieldValue}>{selected.eventType}</span>
              </div>
              <div className={styles.quoteField}>
                <span className={styles.fieldLabel}>Event Date</span>
                <span className={styles.fieldValue}>{selected.eventDate || '—'}</span>
              </div>
              <div className={styles.quoteField}>
                <span className={styles.fieldLabel}>Venue</span>
                <span className={styles.fieldValue}>{selected.venue || '—'}</span>
              </div>
              <div className={styles.quoteField}>
                <span className={styles.fieldLabel}>Guests</span>
                <span className={styles.fieldValue}>{selected.guests || '—'}</span>
              </div>
              <div className={styles.quoteField}>
                <span className={styles.fieldLabel}>Status</span>
                <span className={styles.fieldValue}>
                  <span className={`badge ${
                    selected.status === 'new' ? 'badge-info' :
                    selected.status === 'responded' ? 'badge-success' :
                    selected.status === 'converted' ? 'badge-warning' : 'badge-neutral'
                  }`}>
                    {selected.status}
                  </span>
                </span>
              </div>
              <div className={`${styles.quoteField} ${styles.quoteMessage}`}>
                <span className={styles.fieldLabel}>Message</span>
                <span className={styles.fieldValue}>{selected.message}</span>
              </div>
            </div>

            <div className={styles.modalActions}>
              {selected.status === 'new' && (
                <button className="btn btn-sm" onClick={() => updateStatus(selected.id, 'responded')}>
                  Mark Responded
                </button>
              )}
              {selected.status !== 'converted' && (
                <button className="btn btn-sm btn-accent" onClick={() => updateStatus(selected.id, 'converted')}>
                  Convert to Invoice
                </button>
              )}
              {selected.status !== 'declined' && (
                <button className="btn btn-sm" style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
                  onClick={() => updateStatus(selected.id, 'declined')}>
                  Decline
                </button>
              )}
              <button className="btn btn-sm" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
