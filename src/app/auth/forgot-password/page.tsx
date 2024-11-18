// src/app/auth/forgot-password/page.tsx
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import styles from '../styles/auth.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }) // שליחת האימייל כאובייקט
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message);

      // שליחת המייל רק אם התקבל טוקן
      if (data.resetToken) {
        const emailResult = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            to_email: email,
            user_name: 'משתמש יקר',
            reset_link: `${window.location.origin}/auth/reset-password?token=${data.resetToken}`
          }
        );

        if (emailResult.status === 200) {
          toast.success('נשלח קישור לאיפוס סיסמה');
          router.push('/auth/login');
        }
      }

    } catch (error: any) {
      toast.error(error.message || 'שגיאה בשליחת המייל');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2 className={styles.authTitle}>שחזור סיסמה</h2>
        <p className={styles.authDescription}>
          הזן את כתובת האימייל שלך ונשלח לך קישור לאיפוס הסיסמה
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>אימייל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="name@example.com"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                שולח...
              </>
            ) : (
              'שלח קישור לאיפוס'
            )}
          </button>
        </form>

        <div className={styles.authLinks}>
          <Link href="/auth/login" className={styles.authLink}>
            חזרה להתחברות
          </Link>
        </div>
      </div>
    </div>
  );
}
