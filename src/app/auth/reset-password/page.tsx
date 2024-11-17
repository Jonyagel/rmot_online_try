// src/app/auth/reset-password/page.tsx
'use client'

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import styles from '../styles/auth.module.css';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    router.push('/auth/login');
    toast.error('קישור לא תקין');
    return null;
  }

  const validatePassword = () => {
    if (password.length < 6) {
      toast.error('הסיסמה חייבת להכיל לפחות 6 תווים');
      return false;
    }
    
    if (password !== confirmPassword) {
      toast.error('הסיסמאות אינן תואמות');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success('הסיסמה שונתה בהצלחה');
      
      // Wait a bit before redirecting
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
      
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'שגיאה באיפוס הסיסמה');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2 className={styles.authTitle}>איפוס סיסמה</h2>
        <p className={styles.authDescription}>
          אנא הזן את הסיסמה החדשה שלך
        </p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>סיסמה חדשה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="הכנס סיס��ה חדשה..."
              required
              minLength={6}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>אימות סיסמה</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              placeholder="הכנס שוב את הסיסמה..."
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'מאפס...' : 'איפוס סיסמה'}
          </button>
        </form>
      </div>
    </div>
  );
}
