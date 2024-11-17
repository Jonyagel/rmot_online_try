"use client"
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import styles from '../../auth/styles/auth.module.css';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function SignupForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!nameRef.current?.value || nameRef.current.value.length < 2) {
      newErrors.name = 'שם חייב להכיל לפחות 2 תווים';
      isValid = false;
    }

    if (!emailRef.current?.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
      isValid = false;
    }

    if (!passRef.current?.value || passRef.current.value.length < 6) {
      newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          password: passRef.current?.value
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'שגיאה בהרשמה');
      }

      login(data.token, data.user);
      toast.success('נרשמת בהצלחה!');
      router.push('/profile');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2 className={styles.authTitle}>הרשמה</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>שם מלא</label>
            <input
              id="name"
              ref={nameRef}
              type="text"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="הכנס שם מלא"
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>אימייל</label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="name@example.com"
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>סיסמה</label>
            <input
              id="password"
              ref={passRef}
              type="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="הכנס סיסמה"
            />
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'מתבצעת הרשמה...' : 'הרשמה'}
          </button>
        </form>

        <p className={styles.authLink}>
          יש לך כבר חשבון?{' '}
          <Link href="/auth/login">התחבר כאן</Link>
        </p>
      </div>
    </div>
  );
}
