// src/app/auth/login/LoginForm.tsx
"use client"
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import '../../components/AuthForm.css';
import styles from '../../styles/auth.module.css';
import { saveAuthToken } from '../../../../utils/auth';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await signIn('google', {
        callbackUrl: '/profile',
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        router.push('/profile');
        toast.success('התחברת בהצלחה!');
      }
    } catch (error: any) {
      toast.error('שגיאה בהתחברות עם Google');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // שמירת הטוקן בשני המקומות
      saveAuthToken(data.token, data.user);
      login(data.token, data.user);
      
      toast.success('התחברת בהצלחה!');
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
        <h2 className={styles.authTitle}>התחברות</h2>
        
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className={styles.googleButton}
        >
          <FcGoogle size={24} />
          {isGoogleLoading ? 'מתחבר...' : 'המשך עם Google'}
        </button>

        <div className={styles.divider}>
          <span>או</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>אימייל</label>
            <input
              ref={emailRef}
              type="email"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>סיסמה</label>
            <input
              ref={passwordRef}
              type="password"
              className={styles.input}
              required
            />
            <Link 
              href="/auth/forgot-password" 
              className={styles.forgotPassword}
            >
              שכחת סיסמה?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'מתחבר...' : 'התחבר'}
          </button>
        </form>

        <p className={styles.authLinks}>
          אין לך חשבון עדיין?{' '}
          <Link href="/auth/signup">הרשמה</Link>
        </p>
      </div>
    </div>
  );
}