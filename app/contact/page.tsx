'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './page.module.css';

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday / Celebration',
  'Concert / Festival',
  'Private Party',
  'Portrait Session',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventType: '',
    eventDate: '', venue: '', guests: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', eventType: '', eventDate: '', venue: '', guests: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className={styles.hero}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className={styles.label}>GET IN TOUCH</p>
            <h1 className={styles.title}>
              Let&apos;s <em>Connect</em>
            </h1>
            <p className={styles.subtitle}>
              I&apos;d love to hear about your upcoming event. Fill out the form below and
              I&apos;ll be in touch within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section ${styles.formSection}`}>
        <div className="container-narrow">
          {status === 'success' ? (
            <ScrollReveal>
              <div className={styles.success}>
                <h2>Thank <em>You</em></h2>
                <div className="divider divider-center" />
                <p>Your message has been received. I&apos;ll be in touch within 24 hours to discuss your event.</p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form onSubmit={handleSubmit} className={styles.form} id="quote-form">
                <div className={styles.formRow}>
                  <div className="form-group">
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} required
                      className="form-input" placeholder="Your Full Name"
                      id="input-name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange} required
                      className="form-input" placeholder="Your Email Address"
                      id="input-email"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange}
                      className="form-input" placeholder="Your Phone Number"
                      id="input-phone"
                    />
                  </div>
                  <div className="form-group">
                    <select
                      name="eventType" value={form.eventType}
                      onChange={handleChange} required
                      className="form-select"
                      id="input-eventType"
                    >
                      <option value="">What type of event?</option>
                      {eventTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <input
                      type="date" name="eventDate" value={form.eventDate}
                      onChange={handleChange}
                      className="form-input" placeholder="Event Date"
                      id="input-eventDate"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text" name="venue" value={form.venue}
                      onChange={handleChange}
                      className="form-input" placeholder="Venue / Location"
                      id="input-venue"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text" name="guests" value={form.guests}
                    onChange={handleChange}
                    className="form-input" placeholder="Expected Number of Guests"
                    id="input-guests"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} required
                    className="form-textarea"
                    placeholder="Tell me about your event — what's the occasion, what's important to you, and any special requirements..."
                    id="input-message"
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={status === 'submitting'}
                    id="submit-quote"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Submit Enquiry'}
                  </button>
                </div>

                {status === 'error' && (
                  <p className={styles.errorMsg}>
                    Something went wrong. Please try again or email directly.
                  </p>
                )}
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>

      <section className={`section-sm ${styles.contactInfo}`}>
        <div className="container">
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>Email</h4>
              <a href="mailto:hello@smphotography.com" className={styles.infoValue}>
                hello@smphotography.com
              </a>
            </div>
            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>Based In</h4>
              <span className={styles.infoValue}>Melbourne, Australia</span>
            </div>
            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>Follow</h4>
              <div className={styles.infoSocial}>
                <a href="#">Instagram</a>
                <a href="#">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
