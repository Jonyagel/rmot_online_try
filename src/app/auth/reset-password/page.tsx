// src/app/auth/reset-password/page.tsx
'use client'

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import styles from '../styles/auth.module.css';

// סימון הדף כדינמי
export const dynamic = 'force-dynamic';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
      toast.error('קישור לא תקין');
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('הסיסמאות אינן תואמות');
      return;
    }

    if (password.length < 6) {
      toast.error('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('הסיסמה שונתה בהצלחה');
        router.push('/auth/login');
      } else {
        toast.error(data.message || 'שגיאה באיפוס הסיסמה');
      }
    } catch (error) {
      toast.error('שגיאה באיפוס הסיסמה');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>איפוס סיסמה</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>סיסמה חדשה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="הכנס סיסמה חדשה"
            />
          </div>
          <div className={styles.formGroup}>
            <label>אימות סיסמה</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="הכנס שוב את הסיסמה"
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'מאפס...' : 'אפס סיסמה'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>טוען...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
