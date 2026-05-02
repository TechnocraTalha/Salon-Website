'use client';
import { useState } from 'react';
import { submitContactForm } from '@/lib/firestore';
import styles from '../app/contact/page.module.css';

export default function ContactClient({ siteConfig }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitContactForm(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again or call us directly.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successState}>
        <span className="material-symbols-outlined color-amber" style={{fontSize: 64}}>check_circle</span>
        <h2 className="text-headline-md mt-md">Thank You!</h2>
        <p className="text-body-lg color-muted mt-sm">Your message has been received. We will contact you shortly.</p>
        <button onClick={() => setSuccess(false)} className="btn btn-outline mt-xl">Send Another Message</button>
      </div>
    );
  }

  return (
    <div className="grid md-grid-2 gap-3xl">
      <div>
        <h2 className="text-headline-lg mb-xl">Get in Touch</h2>
        <div className="grid gap-xl">
          <div>
            <h4 className="text-label-caps color-muted mb-xs">Location</h4>
            <p className="text-body-lg">{siteConfig.address.line1}</p>
            <p className="text-body-lg">{siteConfig.address.line2}</p>
          </div>
          <div>
            <h4 className="text-label-caps color-muted mb-xs">Phone</h4>
            <p className="text-body-lg">{siteConfig.phone}</p>
          </div>
          <div>
            <h4 className="text-label-caps color-muted mb-xs">Email</h4>
            <p className="text-body-lg">{siteConfig.email}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="grid gap-lg">
          <input 
            type="text" 
            placeholder="Name" 
            className="input-field" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="input-field" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="tel" 
            placeholder="Phone Number" 
            className="input-field" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <textarea 
            placeholder="How can we help?" 
            className="input-field" 
            rows={4} 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {error && <p className="color-error text-label-caps">{error}</p>}
        </div>
      </form>
    </div>
  );
}
