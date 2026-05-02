'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './page.module.css';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'talhasiddiqui240@gmail.com';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (email !== ADMIN_EMAIL) {
      setError('Access denied. This email is not authorized.');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginLogo}>MUSTAKEEM HANDSOME SALON</h1>
        <p className={styles.loginSubtitle}>Admin Panel</p>
        {error && <div className={styles.errorBanner}>{error}</div>}
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className="grid gap-lg">
            <input type="email" placeholder="Email" className="admin-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="admin-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>{loading ? 'Authenticating...' : 'Sign In'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
